const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');


exports.authenticate = (req, res) => {
	User.findOne({ username: req.body.username }, (err, user) => {
		if (err || !user) {
			return res.status(400).send('User does not exist');
		}
		
		bcrypt.compare(req.body.password, user.password, (err, result) => {
			if (err) {
				return res.status(500).send('An internal error occurred');
			}
			
			if (!result) {
				return res.status(400).send('Incorrect password');
			}
			
			jwt.sign({ id: user._id }, process.env.JWT_KEY, (err, token) => {
				return res.json({ token });
			});
		});
	});
}


exports.verifyToken = (req, res, next) => {
	jwt.verify(req.headers['authorization'], process.env.JWT_KEY, (err, decoded) => {
		if (err || !decoded) {
			return res.status(403).send('Invalid token');
		}
		
		next();
	});
}