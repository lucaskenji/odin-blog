const express = require('express');
const router = express.Router();
const user = require('../controllers/user.js');

// User resource. Will mostly get used with insomnia or curl since there will be only one user
router.get('/users', user.getUsers);
router.get('/users/:userid', user.getUserWithId);
router.post('/users', user.createUser);
router.put('/users/:userid', user.updateUser);
router.delete('/users/:userid', user.deleteUser);

// Post resource
router.get('/posts');
router.get('/posts/:postid');
router.post('/posts');
router.put('/posts/:postid');
router.delete('/posts/:postid');

// Comment resource
router.get('/comments');
router.get('/comments/:commentid');
router.post('/comments');
router.put('/comments/:commentid');
router.delete('/comments/:commentid');

// Authentication
router.post('/signin');


module.exports = router;