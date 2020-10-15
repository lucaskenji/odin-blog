import React from 'react';
import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
	componentDidMount() {
		this.props.clearLoginErrors();
	}
	
	render() {
		if (localStorage.getItem('token')) {
			return (<Redirect to="/admin" />);
		}
		
		const handleForm = (eventObject) => {
			eventObject.preventDefault();
			this.props.handleAuthentication(eventObject);
		}
		
		return (
			<div>
				{
					this.props.state.errors.login
					?
					<div className="alert alert-danger">{ this.props.state.errors.login }</div>
					:
					''
				}
			
				<h1>Login to manage posts</h1>
				
				<form onSubmit={handleForm}>
					<label htmlFor="username">Username</label>
					<input required className="form-control" type="text" name="username" />
					<label htmlFor="password">Password</label>
					<input required className="form-control" type="password" name="password" />
					
					<input type="submit" value="Sign in" className="btn btn-primary mt-2" />
				</form>
			</div>
		);
	}
}

export default LoginForm;