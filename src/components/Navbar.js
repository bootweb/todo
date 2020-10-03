import React, { useState, useEffect } from 'react';
import {Link, NavLink} from 'react-router-dom'; /*<NavLink exact> attribute for active link */
import {connect} from 'react-redux';

import {logout} from '../redux/util/controller';

const mapStateToProps = ({ session: {email, username} }) => ({
  	loggedIn: Boolean(email),
  	username
});

const mapDispatchToProps = dispatch => {
  return {
  	logout: () => dispatch(logout())
  }
};

const Navbar = ({ loggedIn, username, logout }) => {
	const [toggleBtn, setToggleBtn] = useState(false);

	const closeHamburger = () => {
		setToggleBtn(false);
	}
	const openHamburger = () => {
		setToggleBtn(true);
	}
	
	return (
		<React.Fragment>
			<nav>
				<div className="container">
					<ul className={`menu ${toggleBtn ? " blocky" : ""}`}>
						<li className="logo">
							<NavLink to="/">
								<img src="/images/todo.png" alt="logo" />
							</NavLink>
						</li>
						<li className="item first-element" onClick={() => setToggleBtn(false)}>
							<NavLink to="/" exact>Home</NavLink>
						</li>
						{(loggedIn) ?
							<React.Fragment>
								<li className="item user" onClick={() => setToggleBtn(false)}>
									<NavLink
										to="/profile">
										<i className="fa fa-user" aria-hidden="true"></i> Hi, {username} <i className="fa fa-caret-down" aria-hidden="true"></i>
									</NavLink>
									<ul>
										<li onClick={() => setToggleBtn(false)}>
											<Link to="/logout" onClick={() => logout()}>Logout</Link>
										</li>
									</ul>
								</li>
							</React.Fragment>
							:
							<React.Fragment>
								<li className="item button login" onClick={() => setToggleBtn(false)}>
									<NavLink to="/login">Log in</NavLink>
								</li>
								<li className="item button signup" onClick={() => setToggleBtn(false)}>
									<NavLink to="/signup">Sign up</NavLink>
								</li>
							</React.Fragment>
						}
						<li className="toggle" onClick={() => setToggleBtn(!toggleBtn)}><span className="bars"></span></li>
					</ul>
				</div>
			</nav>	
		</React.Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);