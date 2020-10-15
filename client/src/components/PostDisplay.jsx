import React from 'react';
import CommentSection from './CommentSection.jsx';

class PostDisplay extends React.Component {
	componentDidMount() {
		this.props.handleSinglePost(this.props.routeParams.match.params.postid);
	}
	
	render() {
		const state = this.props.state;
		
		if (state.currentPost) {
			return (
				<div>
					<h1>{state.currentPost.title}</h1>
					<em>by {state.currentPost.author.username} in {state.currentPost.formattedDate}</em>
					<p>
						{state.currentPost.text}
					</p>
					
					<hr className="mt-4 mb-4" />
					
					<CommentSection 
						state={this.props.state} 
						handleCommentLoading={this.props.handleCommentLoading} 
						handleCommentCreation={this.props.handleCommentCreation}/> 
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

export default PostDisplay;