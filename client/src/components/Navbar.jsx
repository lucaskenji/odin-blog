import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
	if (!localStorage.getItem('token')) {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link className="nav-link" to="/">Blog</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/signin">Login</Link>
					</li>
				</ul>
			</nav>
		);
	}
	
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link className="nav-link" to="/">Blog</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/admin">Dashboard</Link>
				</li>
				<li className="nav-item" onClick={props.handleLogout}>
					<Link className="nav-link" to="/logout">Logout</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;