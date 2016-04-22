// classes
import Store from './store';

// instances
import dispatcher from '../dispatchers/devices.js';
import constants from '../constants/devices.js';
import actions from '../actions/devices.js';

let _state = {
	lights: {
		1: {},
		2: {}
	},
	rooms: {
		42: {},
		43: {}
	}
};

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
	console.info('device-store', action.type);

	switch (action.type) {
		case constants.INITIALIZE:
			window.socket.on('update:sensors', actions.updateSensors);
			window.socket.on('update:light', actions.updateLight);
		break;

		case constants.UPDATE_LIGHT:
			_state.lights[action.data.id] = action.data.state;
		break;

		case constants.UPDATE_SENSORS:
			action.data.forEach((sensor) => {
				_state.rooms[sensor.room][sensor.type] = {
					value: sensor.value,
					lastUpdate: Date.now()
				};
			});
		break;
	}

	store.emitChange();
});

export default store;
