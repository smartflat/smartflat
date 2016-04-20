// classes
import Store from './store';

// instances
import dispatcher from '../dispatchers/utilities.js';
import constants from '../constants/utilities.js';
import actions from '../actions/utilities.js';

import deviceActions from '../actions/devices.js';

// alias
const c = constants;

let _state;

class UtilityStore extends Store {
	constructor () {
		super();
	}

	getState () {
		return _state;
	}

	purge () {
		_state = {
			authenticated: false
		};
	}
}

let store = new UtilityStore();
store.purge();

store.dispatchToken = dispatcher.register(action => {
	if (!action.type) {
		console.error('store:utilities', 'no action type', action);
	}
	switch (action.type) {
		case c.AUTHENTICATE:
			if (localStorage.getItem('token')) {
				window.socket.emit('authenticate', localStorage.getItem('token'), function (err, data) {
					if (!err) {
						console.info('Authenticated!');
						_state.authenticated = true;
						store.emitChange();
					} else if (err != 'already authenticated') {
						localStorage.removeItem('token');
						setTimeout(function () {
							actions.authenticate();
						}, 0);
					}
				});
			} else {
				localStorage.setItem('token', prompt('key'));
				setTimeout(function () {
					actions.authenticate();
				}, 0);
			}
		break;
		case c.DEAUTHENTICATE:
			localStorage.removeItem('token');
			window.socket.disconnect();
			window.socket.connect();
			_state.authenticated = false;
		break;
	}

	store.emitChange();
	console.log('store:utilities', action, _state);
});

export default store;
