import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import {checkLoggedIn} from './redux/util/controller';
import myStore from './redux/store';

import App from './components/App';

const rootApp = (preloadedState) => {
	const store = myStore(preloadedState);
	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>, document.getElementById('root')
	);
}

(async () => rootApp(await checkLoggedIn()))();