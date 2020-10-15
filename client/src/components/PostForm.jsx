import React from 'react';
import { Redirect } from 'react-router-dom';

function PostForm(props) {
	if (!localStorage.getItem('token')) {
		return (<Redirect to="/signin" />);
	}
	
	return (
		<div>
			<h1>Create new post</h1>
			<form onSubmit={props.handlePostCreation}>
				<label htmlFor="title">Title</label>
				<input required className="form-control" type="text" name="title" />
				<label htmlFor="text">Content</label>
				<textarea rows="7" required className="form-control mb-2" name="text"></textarea>
				<input type="checkbox" name="hidden" />&nbsp;
				<label htmlFor="hidden">Leave as unpublished</label><br/>
				
				<input type="submit" value="Create" className="btn btn-primary mt-2" />
			</form>
		</div>
	);
}

export default PostForm;