import React from 'react';
import CommentForm from './CommentForm.jsx';

class CommentSection extends React.Component {
	componentDidMount() {
		this.props.handleCommentLoading(this.props.state.currentPost._id);
	}
	
	render() {
		const state = this.props.state;
		
		if (!state.commentsLoading) {
			return (
				<div>
					<h3>Comments</h3>
					{ 
						state.comments.map((comment) => 
							<div className="pl-4 alert-secondary mb-2">
								<strong>{comment.author} commented</strong>
								<p>{comment.text}</p>
								<em>on {comment.formattedDate}</em>
							</div>) 
					}
					
					<CommentForm postId={this.props.state.currentPost._id} handleCommentCreation={this.props.handleCommentCreation} />
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

export default CommentSection;