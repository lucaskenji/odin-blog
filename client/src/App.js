import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { push, Redirector } from 'react-router-redirect';

import Navbar from './components/Navbar.jsx';
import Posts from './components/Posts.jsx';
import LoginForm from './components/LoginForm.jsx';
import AdminPosts from './components/AdminPosts.jsx';
import PostForm from './components/PostForm.jsx';
import PostEditForm from './components/PostEditForm.jsx';
import PostDisplay from './components/PostDisplay.jsx';

class App extends React.Component {
	state = {
		posts: [],
		comments: [],
		loading: false,
		commentsLoading: false,
		currentPost: null,
		errors: {}
	}
	
	handlePostLoading = () => {
		this.setState({ loading: true }, () => {
			axios.get('http://localhost:8080/api/posts')
				.then((response) => {
					this.setState({ posts: response.data, loading: false });
				})
				.catch((err) => {
					console.log(err);
				})
		});
	}
	
	handleSinglePost = (postId) => {
		this.setState({ currentPost: null, loading: true }, () => {
			axios.get('http://localhost:8080/api/posts/' + postId)
				.then((response) => {
					this.setState({ currentPost: {...response.data}, loading: false });
				})
				.catch((err) => {
					console.log(err);
				})
		});
	}
	
	clearLoginErrors = () => {
		const errors = this.state.errors;
		
		if (errors.login) {
			delete errors.login;
			this.setState({ errors });
		}
	}
	
	handleAuthentication = (form) => {
		const errors = this.state.errors;
		
		if (errors.login) {
			delete errors.login;
		}
			
		const username = form.target.username.value;
		const password = form.target.password.value;
		
		this.setState({ errors }, () => {
			
			axios.post('http://localhost:8080/api/signin', { username, password })
				.then((response) => {
					localStorage.setItem('token', response.data.token);
					push('/admin');
				})
				.catch((err) => {
					if (!err.response) {
						errors.login = 'Something went wrong. Please try again later.';
					} else if (err.response.status === 400) {
						errors.login = 'Incorrect username and/or password.';
					} else {
						errors.login = 'Something went wrong. Please try again later.';
					}
					
					this.setState({ errors });
				});
		});
	}
	
	handlePostCreation = (form) => {
		form.preventDefault();
		
		const title = form.target.title.value;
		const text = form.target.text.value;
		const hidden = form.target.hidden.checked;
		
		axios.post('http://localhost:8080/api/posts', { title, text, hidden }, { headers: { 'Authorization':localStorage.getItem('token') }})
			.then((response) => {
				push('/admin');
			})
			.catch((err) => {
				console.log(err);
			});
	}
	
	handlePostUpdate = (form) => {
		form.preventDefault();
		
		const title = form.target.title.value;
		const text = form.target.text.value;
		const postId = form.target.id.value;
		const hidden = form.target.hidden.checked;
		
		axios.put('http://localhost:8080/api/posts/' + postId, { title, text, hidden }, { headers: { 'Authorization':localStorage.getItem('token') }})
			.then((response) => {
				push('/admin');
			})
			.catch((err) => {
				console.log(err);
			});
	}
		
	
	handlePostDeletion = (postId) => {
		axios.delete('http://localhost:8080/api/posts/' + postId, { headers: { 'Authorization':localStorage.getItem('token') }})
			.then((response) => {
				this.handlePostLoading();
			})
			.catch((err) => {
				console.log(err);
			});
	}
	
	handleCommentLoading = (postId) => {
		this.setState({ commentsLoading: true, comments: [] }, () => {
			axios.get('http://localhost:8080/api/posts/' + postId + '/comments')
				.then((response) => {
					this.setState({ comments: response.data, commentsLoading: false });
				})
				.catch((err) => {
					console.log(err);
				})
		});
	}
	
	handleCommentCreation = (form) => {
		form.preventDefault();
		
		const author = form.target.author.value; 
		const text = form.target.text.value;
		const postId = form.target.id.value;
		
		axios.post('http://localhost:8080/api/posts/' + postId + '/comments', { author, text })
			.then((response) => {
				this.handleCommentLoading(postId);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	
	handleLogout = () => {
		localStorage.clear();
	}
	
	render() {
		return (
			<div className="App">
				<Router>
					<Navbar handleLogout={this.handleLogout} />
				
					<div className="card card-body mt-2 container">
						<Redirector/>
						<Switch>
							<Route path="/logout">
								<Redirect to="/" />
							</Route>
							<Route path="/admin/edit/:postid" render={
								(routeParams) => <PostEditForm 
													routeParams={routeParams} 
													state={this.state} 
													handleSinglePost={this.handleSinglePost} 
													handlePostUpdate={this.handlePostUpdate} 
												/>
							}/>
							<Route path="/admin/new">
								<PostForm handlePostCreation={this.handlePostCreation} />
							</Route>
							<Route path="/admin">
								<AdminPosts 
									state={this.state} 
									handlePostLoading={this.handlePostLoading} 
									handlePostDeletion={this.handlePostDeletion} 
								/>
							</Route>
							<Route path="/post/:postid" render={
								(routeParams) => <PostDisplay 
													routeParams={routeParams} 
													state={this.state} 
													handleSinglePost={this.handleSinglePost} 
													handleCommentLoading={this.handleCommentLoading} 
													handleCommentCreation={this.handleCommentCreation} 
												/>
							}/>
							<Route path="/signin">
								<LoginForm 
									handleAuthentication={this.handleAuthentication} 
									state={this.state} 
									clearLoginErrors={this.clearLoginErrors} 
								/>
							</Route>
							<Route path="/">
								<Posts state={this.state} handlePostLoading={this.handlePostLoading} />
							</Route>
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}


export default App;
