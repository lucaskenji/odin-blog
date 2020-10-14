const express = require('express');
const router = express.Router();
const user = require('../controllers/user.js');
const post = require('../controllers/post.js');
const comment = require('../controllers/comment.js');
const auth = require('../controllers/auth.js');


// User resource. Will mostly get used with insomnia or curl since there will be only one user
router.get('/users', auth.verifyToken, user.getUsers);
router.get('/users/:userid', auth.verifyToken, user.getUserWithId);
router.post('/users', auth.verifyToken, user.createUser);
router.put('/users/:userid', auth.verifyToken, user.updateUser);
router.delete('/users/:userid', auth.verifyToken, user.deleteUser);

// Post resource
router.get('/posts', post.getPosts);
router.get('/posts/:postid', post.getPostWithId);
router.post('/posts', auth.verifyToken, post.postValidation, post.createPost);
router.put('/posts/:postid', auth.verifyToken, post.updatePost);
router.delete('/posts/:postid', auth.verifyToken, post.deletePost);

// Comment resource
router.get('/posts/:postid/comments', comment.getComments);
router.get('/posts/:postid/comments/:commentid', comment.getCommentWithId);
router.post('/posts/:postid/comments', comment.commentValidation, comment.createComment);
router.put('/posts/:postid/comments/:commentid', comment.updateComment);
router.delete('/posts/:postid/comments/:commentid', auth.verifyToken, comment.deleteComment);

// Authentication
router.post('/signin', auth.authenticate);

module.exports = router;