const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.getPosts = (req, res) => {
	Post.find().sort({date: 'desc'}).lean().populate('author')
	.then((results) => {
		return res.json(results);
	})
	.catch((err) => {
		console.log(err);
		return res.status(500).send('An internal error occurred.');
	});
}


exports.getPostWithId = (req, res) => {
	Post.findById(req.params.postid).lean().populate('author')
	.then((result) => {
		if (!result) {
			return res.status(404).send('Post not found');
		}
		
		return res.json(result);
	})
	.catch((err) => {
		console.log(err);
		return res.status(500).send('An internal error occurred.');		
	});
}


exports.postValidation = [
	body('title').not().isEmpty().trim().escape(),
	body('text').not().isEmpty().trim().escape(),
	body('hidden').exists()
]


exports.createPost = (req, res) => {
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) {
		return res.status(400).send('Post must contain a title, some text and an author ID.');
	}
	
	jwt.verify(req.headers['authorization'], process.env.JWT_KEY, (jwtErr, decoded) => {
		if (jwtErr || !decoded) {
			return res.status(403).send('Invalid token');
		}
		
		const currentDate = new Date();
		let timestamp = [currentDate.getDay(), currentDate.getMonth(), currentDate.getFullYear()];
				
		if (timestamp[0] < 10) {
			timestamp[0] = ['0', timestamp[0]].join('');
		}
		
		if (timestamp[1] < 10) {
			timestamp[1] = ['0', timestamp[1]].join('');
		}		
		
		const newPost = new Post({
			title: req.body.title,
			text: req.body.text,
			author: decoded.id,
			date: currentDate,
			formattedDate: timestamp.join('/'),
			hidden: req.body.hidden
		});
		
		newPost.save((err) => {
			if (err) {
				return res.status(500).send('An internal error occurred.');
			}
			
			return res.json(newPost);
		});
	});
}


exports.updatePost = (req, res) => {
	const bodyData = {
		title: req.body.title, 
		text: req.body.text,
		hidden: req.body.hidden
	};
	const newPostData = {};
	
	for (const data in bodyData) {
		if (bodyData[data]) {
			newPostData[data] = bodyData[data];
		}
	}
	
	if (bodyData.hasOwnProperty('hidden')) {
		newPostData['hidden'] = bodyData['hidden']; 
	}
	
	Post.updateOne({ _id: req.params.postid }, newPostData, (err, result) => {
		if (err) {
			return res.status(500).send('An internal error occurred');
		}
		
		return res.json({ ok: result.ok });
	});
}


exports.deletePost = (req, res) => {
	Post.deleteOne({ _id: req.params.postid }, (err, result) => {
		if (err) {
			return res.status(500).send('An internal error occurred.');
		}
		
		Comment.deleteMany({ post: req.params.postid }, (err, commentResult) => {
			return res.json({ ok: result.ok });
		});
	});
}