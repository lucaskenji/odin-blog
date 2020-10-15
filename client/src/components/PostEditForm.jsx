import React from 'react';
import { Redirect } from 'react-router-dom';

class PostEditForm extends React.Component {
	componentDidMount() {
		this.props.handleSinglePost(this.props.routeParams.match.params.postid);
	}
	
	render() {
		const state = this.props.state;
		
		if (!localStorage.getItem('token')) {
			return (<Redirect to="/signin" />);
		}
		
		if (state.currentPost) {
			return (
				<div>
					<h1>Edit new post</h1>
					<form onSubmit={this.props.handlePostUpdate}>
						<label htmlFor="title">Title</label>
						<input required className="form-control" type="text" name="title" defaultValue={state.currentPost.title} />
						<label htmlFor="text">Content</label>
						<textarea rows="7" required className="form-control mb-2" name="text" defaultValue={state.currentPost.text}></textarea>
						<input name="id" type="hidden" value={state.currentPost._id} />
						
						<input type="checkbox" name="hidden" defaultChecked={state.currentPost.hidden} />&nbsp;
						<label>Unpublished</label><br/>
						
						
						<input type="submit" value="Save" className="btn btn-primary mt-2" />
					</form>
				</div>
			);
		}
		
		return (
			<div className="spinner-border" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		);
	}
}

export default PostEditForm;