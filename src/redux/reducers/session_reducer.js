import {RECEIVE_CURRENT_USER, UPDATE_CURRENT_USER, LOGOUT_CURRENT_USER} from '../util/controller';

const _nullSession = { name: null, email: null }
const session = (state = _nullSession, { type, user }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_CURRENT_USER:
    	return user;
	case UPDATE_CURRENT_USER:
    	return user;
    case LOGOUT_CURRENT_USER:
    	return _nullSession;
    default:
    	return state;
  }
};

export default session;