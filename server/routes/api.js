const express = require('express');
const router = express.Router();
const user = require('../controllers/user.js');
const post = require('../controllers/post.js');
const comment = require('../controllers/comment.js');


// User resource. Will mostly get used with insomnia or curl since there will be only one user
router.get('/users', user.getUsers);
router.get('/users/:userid', user.getUserWithId);
router.post('/users', user.createUser);
router.put('/users/:userid', user.updateUser);
router.delete('/users/:userid', user.deleteUser);

// Post resource
router.get('/posts', post.getPosts);
router.get('/posts/:postid', post.getPostWithId);
router.post('/posts', post.postValidation, post.createPost);
router.put('/posts/:postid', post.updatePost);
router.delete('/posts/:postid', post.deletePost);

// Comment resource
router.get('/posts/:postid/comments', comment.getComments);
router.get('/posts/:postid/comments/:commentid', comment.getCommentWithId);
router.post('/posts/:postid/comments', comment.commentValidation, comment.createComment);
router.put('/posts/:postid/comments/:commentid', comment.updateComment);
router.delete('/posts/:postid/comments/:commentid', comment.deleteComment);

// Authentication
router.post('/signin');


module.exports = router;