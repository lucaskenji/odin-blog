const Comment = require('../models/Comment.js');
const Post = require('../models/Post.js');
const { body, validationResult } = require('express-validator');


exports.getComments = (req, res) => {
	Comment.find({ post: req.params.postid }, (err, results) => {
		if (err) {
			return res.status(404).send('No comments found');
		}
		
		if (results.length === 0) {
			return res.status(404).send('No comments found');
		}
		
		res.json(results);
	})
}


exports.getCommentWithId = (req, res) => {
	Comment.find({ post: req.params.postid, _id: req.params.commentid }, (err, result) => {
		if (err) {
			return res.status(404).send('Comment not found');
		}
		
		res.json(result);
	})
}


exports.commentValidation = [
	body('author').not().isEmpty(),
	body('text').not().isEmpty()
]


exports.createComment = (req, res) => {
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) {
		return res.status(400).send('Must provide an author name and some text to add a comment.');
	}
	
	Post.findById(req.params.postid, (err, post) => {
		if (err || !post) {
			return res.status(400).send('Post does not exist');
		}
		
		const newComment = new Comment({
			author: req.body.author,
			text: req.body.text,
			timestamp: new Date(),
			post: req.params.postid
		});
		
		newComment.save((err) => {
			if (err) {
				return res.status(500).send('An internal error occurred.');
			}
			
			return res.json(newComment);
		})
	});
}


exports.updateComment = (req, res) => {
	const bodyData = {
		author: req.body.author,
		text: req.body.text
	}
	const newCommentData = {}
	
	for (const data in bodyData) {
		if (bodyData[data]) {
			newCommentData[data] = bodyData[data];
		}
	}
	
	Comment.updateOne({ _id: req.params.commentid, post: req.params.postid }, newCommentData, (err, result) => {
		if (err) {
			return res.status(500).send('An internal error occurred');
		}
		
		return res.json({ ok: result.ok });
	})
}


exports.deleteComment = (req, res) => {
	Comment.deleteOne({ _id: req.params.commentid, post: req.params.postid }, (err, result) => {
		if (err) {
			return res.status(500).send('An internal error occurred');
		}
		
		return res.json({ ok: result.ok });
	})
}