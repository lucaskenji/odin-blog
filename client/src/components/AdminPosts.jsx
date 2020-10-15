import React from 'react';
import { Redirect, Link } from 'react-router-dom';

class AdminPosts extends React.Component {
	componentDidMount() {
		this.props.handlePostLoading();
	}
	
	render() {
		if (!localStorage.getItem('token')) {
			return (
				<Redirect to="/signin" />
			);
		}
		
		const state = this.props.state;
		
		if (!state.loading) {
			return (
				<div>
					<h1>All posts</h1>
					<Link to="/admin/new" className="btn btn-primary mb-4">New post</Link>
				
					{ state.posts.map((post) => 
						<div className="card card-body mb-2" key={post._id}>
							<h3>{post.title}</h3>
							<div>
								<Link to={"/admin/edit/" + post._id} className="btn btn-secondary btn-inline mr-2">Edit</Link>
								<button className="btn btn-danger btn-inline" onClick={() => this.props.handlePostDeletion(post._id)}>Delete</button>
							</div>
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

export default AdminPosts;