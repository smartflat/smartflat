// classes
import Store from './store';

// instances
import dispatcher from '../dispatchers/devices.js';
import constants from '../constants/devices.js';
import actions from '../actions/devices.js';

let _state = {};

class DeviceStore extends Store {
	constructor () {
		super();
	}

	getState () {
		return _state;
	}
}

let store = new DeviceStore();

store.dispatchToken = dispatcher.register(action => {
	switch (action.type) {
		case '':

		break;
	}

	store.emitChange();
});

export default store;
