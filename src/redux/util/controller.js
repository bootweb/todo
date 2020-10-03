import axios from 'axios';

// Action Types
// session
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

// server response
export const RECEIVE_SUCCESS_MESSAGE = "RECEIVE_SUCCESS_MESSAGE";
export const RECEIVE_FAILURE_MESSAGE = "RECEIVE_FAILURE_MESSAGE";
export const CLEAR_SERVER_RESPONSE = "CLEAR_SERVER_RESPONSE";

// Other constants
// session
const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});
const updateCurrentUser = user => ({
  type: UPDATE_CURRENT_USER,
  user
});
const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

// server response
export const receiveSuccessMessage = (message) => ({
	type: RECEIVE_SUCCESS_MESSAGE,
	message
});
export const receiveFailureMessage = (message) => ({
	type: RECEIVE_FAILURE_MESSAGE,
	message
});
export const clearResponse = () => ({
	type: CLEAR_SERVER_RESPONSE
});

// FUNCTIONS
export const login = (user) => {
	return dispatch =>
		axios.post('/api/login', user)
			.then(resp => {
				if (resp.data.redirect) {
					const {user} = resp.data;
					// console.log('reached, login successful');
					const sR = {
						success: resp.data.message
					}
					// login successful
					dispatch(receiveSuccessMessage(sR));
					return dispatch(receiveCurrentUser(user));
				} else {
					const {type} = resp.data;
					if (type === 'failure') {
						const sR = {
							failure: resp.data.message
						}
						return dispatch(receiveFailureMessage(sR));
					}
				}
			})
			.catch(console.error);
};

export const signup = (user) => {
	return dispatch =>
		axios.post('/api/signup', user)
			.then(resp => {
				if (resp.data.redirect) {
					const {user} = resp.data;
					const sR = {
						success: resp.data.message
					}
					// signup succesful
					dispatch(receiveSuccessMessage(sR));
					return dispatch(receiveCurrentUser(user));
				} else {
					const {type} = resp.data;
					if (type === 'failure') {
						const sR = {
							failure: resp.data.message
						}
						return dispatch(receiveFailureMessage(sR));
					}
				}
			})
			.catch(console.error);
};

export const logout = () => {
	return dispatch =>
		axios.delete('/api/logout')
			.then(resp => {
				if (resp.data.redirect) {
					// logout successful
					const sR = {
						success: resp.data.message
					}
					dispatch(receiveSuccessMessage(sR))
					return dispatch(logoutCurrentUser());
				} else {
					// console.log(resp.data.message);
				}
			})
			.catch(err => {
				console.log(err);
			})
};

export const update = () => {
	return dispatch =>
		axios.get('/api/getUser')
			.then(resp => {
				if (resp.data.user) {
					const {user} = resp.data;
					const sR = {
						success: resp.data.message
					}
					dispatch(receiveSuccessMessage(sR));
					return dispatch(updateCurrentUser(user));
				}
			})
			.catch(err => {
				console.log(err);
			})
};

export const updateSilently = () => {
	return dispatch =>
		axios.get('/api/getUser')
			.then(resp => {
				if (resp.data.user) {
					const {user} = resp.data;
					// dispatch(receiveSuccessMessage(null));
					return dispatch(updateCurrentUser(user));
				}
			})
			.catch(err => {
				console.log(err);
			})
};

export const checkLoggedIn = async () => {
	let preloadedState = {};
	await axios.get('/api/getUser')
		.then(resp => {
			if (resp.data.user) {
				const {user} = resp.data;
				// console.log('Enable autologin', user);
				if (user) {
					preloadedState = {session: user, serverResponse: ""};
					// console.log(preloadedState);
				}
			}
		})
		.catch(console.error);
	return preloadedState;
};