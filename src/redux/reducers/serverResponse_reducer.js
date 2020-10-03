import {RECEIVE_SUCCESS_MESSAGE, RECEIVE_FAILURE_MESSAGE, CLEAR_SERVER_RESPONSE} from '../util/controller';

const _nullServerResponse = { success: null, failure: null }
const serverResponse = (state = _nullServerResponse, { type, message }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_SUCCESS_MESSAGE:
    	return message;
	  case RECEIVE_FAILURE_MESSAGE:
    	return message;
    case CLEAR_SERVER_RESPONSE:
    	return _nullServerResponse;
    default:
    	return state;
  }
};

export default serverResponse;