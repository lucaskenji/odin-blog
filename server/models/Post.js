const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: String,
	text: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	timestamp: Date,
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	hidden: {
		type: Boolean,
		default: false
	}
});

const Post = mongoose.model('Post', postSchema);


module.exports = Post;