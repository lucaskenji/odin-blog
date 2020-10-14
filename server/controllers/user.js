const User = require('../models/User.js');


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