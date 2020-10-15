const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	author: String,
	text: String,
	date: Date,
	formattedDate: String,
	post: {
		type: Schema.Types.ObjectId,
		ref: 'Post',
		required: true
	}
});

const Comment = mongoose.model('Comment', commentSchema);


module.exports = Comment;