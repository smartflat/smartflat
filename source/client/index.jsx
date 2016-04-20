// modules
import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

// components
import App from './components/app.jsx';

// stores
import deviceStore from './stores/devices.js';
import utilityStore from './stores/utilities.js';

// actions
import utilityActions from './actions/utilities.js';
import deviceActions from './actions/devices.js';

// connect & render
window.onload = () => {
	window.socket = io.connect();
	window.socket.on('connect', function () {
		if (localStorage.getItem('token')) {
			utilityActions.authenticate();
		}
		ReactDOM.render(
			<App/>,
			document.getElementsByTagName('div')[0]
		);
	});
	deviceActions.initialize();
};

// save state
window.addEventListener('hashchange', function () {
	if (location.hash.length) {
		localStorage.setItem('state', location.hash);
	}
}, false);

// restore state
location.hash = (localStorage.getItem('state')) ? localStorage.getItem('state') : '';
