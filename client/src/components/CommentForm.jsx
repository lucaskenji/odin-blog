import React from 'react';

function CommentForm(props) {	
	return (
		<div className="card card-body">
			<form onSubmit={props.handleCommentCreation}>
				<label htmlFor="title">Your name</label>
				<input required className="form-control" type="text" name="author" />
				<label htmlFor="text">Message</label>
				<input required className="form-control" type="text" name="text" />
				
				<input type="hidden" name="id" value={props.postId}/>
				
				<input type="submit" value="Send" className="btn btn-primary mt-2" />
			</form>
		</div>
	);
}

export default CommentForm;