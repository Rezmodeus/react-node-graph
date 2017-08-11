import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger'
import INITIAL_STATE from './INITIAL_STATE';
import Reducer from './Reducer';

let state = INITIAL_STATE;

const middlewares = [thunk];

// do not run logger in production mode.

if (process.env.NODE_ENV !== 'production') {
	const logger = createLogger({
		timestamp: true,
		duration: true,
		collapsed: true,
		predicate: (getState, action) => true,
		stateTransformer: (state) => state
	});
	middlewares.push(logger);
}


const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export const Store = createStoreWithMiddleware(Reducer, state);

