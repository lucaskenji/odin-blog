const User = require('../models/User.js');
const bcrypt = require('bcryptjs');


exports.getUsers = (req, res) => {
	User.find({}, (err, results) => {
		if (err) {
			return res.status(500).send('An internal error occurred');
		}
		
		if (results.length === 0) {
			return res.status(404).send('No users found');
		}
		
		return res.json(results);
	});
}


exports.getUserWithId = (req, res) => {
	User.findById(req.params.userid, (err, result) => {
		if (err) {
			return res.status(404).send('No users found');
		}
		
		return res.json(result);
	});
}


exports.createUser = (req, res) => {
	// This project will be using basic validation since user registration will rarely be used.
	if (!req.body.username || !req.body.password) {
		return res.status(400).send('Requires an object with an username and a password.');
	}
	
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return res.status(500).send('An internal error occurred');
		}
		
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			if (err) {
				return res.status(500).send('An internal error occurred');
			}
			
			const userObject = {
				username: req.body.username,
				password: hash
			}
			const newUser = new User(userObject);

			newUser.save((err) => {
				if (err) {
					return res.status(500).send('An internal error occurred');
				}
				
				return res.json(userObject);
			})
		});
	});
}


exports.updateUser = (req, res) => {
	const hashPassword = () => {
		return new Promise((resolve, reject) => {
			bcrypt.genSalt(10, (err, salt) => {
				if (err) {
					reject(err);
				}
				
				bcrypt.hash(req.body.password, salt, (err, hash) => {
					if (err) {
						reject(err);
					}
					resolve(hash);	
				});
			});
		});
	};
	
	User.findById(req.params.userid, async (err, result) => {
		if (err || !result) {
			return res.status(404).send('User not found.');
		}
		
		result.username = req.body.username ? req.body.username : result.username;
		
		if (req.body.password) {
			let hashedPassword = '';
			
			try {
				hashedPassword = await hashPassword();
			} catch(err) {
				console.log(err);
				return res.status(500).send('An internal error occurred.');
			}
			
			result.password = hashedPassword;
		}
		
		result.save((err) => {
			if (err) {
				return res.status(500).send('An internal error occurred');
			}
			
			return res.json({ ok: result.ok });
		});
	});
}


exports.deleteUser = (req, res) => {
	User.deleteOne({ _id: req.params.userid }, (err, result) => {
		if (err) {
			return res.status(500).send('An internal error occurred.');
		}
		
		return res.json({ ok: result.ok });
	});
}