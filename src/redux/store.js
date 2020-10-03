import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers/root';

const myStore = (preloadedState) => 
	createStore(
		reducer,
		preloadedState,
		applyMiddleware(
			thunk // lets us dispatch() functions
		)
	)

export default myStore;