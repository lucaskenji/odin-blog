const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const { body, validationResult } = require('express-validator');


exports.getPosts = (req, res) => {
	Post.find().lean().populate('comments').populate('author')
	.then((results) => {
		if (results.length === 0) {
			return res.status(404).send('No posts found');
		}
		
		return res.json(results);
	})
	.catch((err) => {
		console.log(err);
		return res.status(500).send('An internal error occurred.');
	});
}


exports.getPostWithId = (req, res) => {
	Post.findById(req.params.postid).lean().populate('comments').populate('author')
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
	body('author').not().isEmpty()
]


exports.createPost = (req, res) => {
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) {
		return res.status(400).send('Post must contain a title, some text and an author ID.');
	}
	
	const newPost = new Post({
		title: req.body.title,
		text: req.body.text,
		author: req.body.author,
		timestamp: new Date(),
		comments: []
	});
	
	newPost.save((err) => {
		if (err) {
			return res.status(500).send('An internal error occurred.');
		}
		
		return res.json(newPost);
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
		
		return res.json({ ok: result.ok });
	});
}