import React from 'react';
import { Link } from 'react-router-dom';

class Posts extends React.Component {
	componentDidMount() {
		this.props.handlePostLoading();
	}
	
	render() {
		const state = this.props.state;
		
		if (!state.loading) {
			if (state.posts.length === 0) {
				return (
					<div>
						Nothing here yet.
					</div>
				)
			}
			
			return (
				<div>
					{ state.posts.filter((post) => post.hidden === false).map((post) => 
						<div className="card card-body mb-2" key={post._id}>
							<Link className="post-title" to={"/post/" + post._id}>{post.title}</Link>
							<em>by {post.author.username} in {post.formattedDate}</em>
							<p>{post.text}</p>
						</div>
					) }
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


export default Posts;