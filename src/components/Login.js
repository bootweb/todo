import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {login} from '../redux/util/controller';

// const mapStateToProps = ({ apiError }) => ({
//   apiError
// });

const mapDispatchToProps = dispatch => {
  return {
  	login: user => dispatch(login(user))
  }
};

const Login = ({ login }) => {
	// ref to avoid error on first render
	const firstRenderEmail = useRef(true);
	const firstRenderPassword = useRef(true);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const emailHandler = (event) => {
		setEmail(event.target.value.toLowerCase().trim());
	}
	const passwordHandler = (event) => {
		setPassword(event.target.value.trim());
	}

	// Email Validation
	useEffect(() => {
		if (firstRenderEmail.current) {
			firstRenderEmail.current = false;
			return;
		}
		if (/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[A-Za-z]+$/.test(email)) {
			setEmailError('');
		} else {
			setEmailError('Enter a valid email');
		}
	}, [email]);

	// Password Validation
	useEffect(() => {
		if (firstRenderPassword.current) {
			firstRenderPassword.current = false;
			return;
		}
		if (password === "") {
			setPasswordError('Enter your password');
		} else {
			setPasswordError('');
		}
	}, [password]);

	// Validation
	const validate = () => {
		if (/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[A-Za-z]+$/.test(email)) {
			setEmailError('');
		} else {
			setEmailError('Enter a valid email');
		}
		if (password === "") {
			setPasswordError('Enter your password');
		} else {
			setPasswordError('');
		}
		if (!(/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[A-Za-z]+$/.test(email)) || password === "") {
			return false;
		}
		return true;
	}

	// Form Submit
	const handleLogin = (event) => {
		event.preventDefault();
		const isValid = validate();
		if (isValid) {
			// Login Mode Form Submit
			const user = {
				email,
				password
			}
			login(user);
		}
	}

	return (
		<React.Fragment>
			<div className="header">
				<div className="header-text">Your Personal Assistant</div>
				<p>Start creating your todo list</p>
			</div>
			<div className="container login-form">
				<div className="p-lr">
					<div className="card">
						<div className="title">Login</div>
						<form>						
							<label htmlFor="email">Email</label>
							<input 
								type="text"
								id="email"
								value={email}
								onChange={emailHandler}
								className={`${(emailError !== "") && "red-input"}`}
							/>
							{emailError !== "" && <p className="error_text"><i>!</i> &nbsp;{emailError}</p>}

							<label htmlFor="password">Password</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={passwordHandler}
								className={`${(passwordError !== "") && "red-input"}`}
							/>
							{passwordError !== "" && <p className="error_text"><i>!</i> &nbsp;{passwordError}</p>}

							<button type="submit" onClick={handleLogin}>Continue</button>
						
						</form>
					</div>
					
					<div className="signUpArea">
						<p className="new_to_bootweb"><span>New to ToDo?</span></p>
						<Link to="/signup" className="signUpBtnLink"><button className="signUpBtn">Create your Bloggit account</button></Link>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default connect(null, mapDispatchToProps)(Login);