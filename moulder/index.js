import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {Provider} from 'react-redux';
import {Store} from './Store';


ReactDOM.render(
	<Provider store={Store}>
		<App/>
	</Provider>,
	document.getElementById('reactroot')
);

