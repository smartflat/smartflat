const Hue = require('philips-hue');
const lib = new Hue();

const credentials = require('../../credentials.json');

const io = require('./socket');

lib.bridge = credentials.hue.host;
lib.username = credentials.hue.token;

const _state = {};

export function initialize () {
	lib.getLights().then(function (lights) {
		Object.keys(lights).forEach((item) => {
			let light = lights[item];
			_state[item] = {
				on: light.state.on,
				brightness: light.state.bri,
				hue: light.state.hue,
				saturation: light.state.sat,
				effect: light.state.effect || light.state.alert,
				reachable: light.state.reachable,
				name: light.name
			};
		});
	});
}

export function toggle (id) {
	_state[id].on ^= true;
	applyOn(id);
}

export function set (id, on) {
	if (_state[id] !== on) {
		_state[id].on = on;
		applyOn(id);
	}
}

export function rainbow (id) {
	if (_state[id].effect !== 'colorloop') {
		_state[id].effect = 'colorloop';
		_state[id].hue = 0;
		_state[id].saturation = 255;
		_state[id].brightness = 255;
		_state[id].on = true;
		lib.light(id).setState({
			effect: 'colorloop',
			hue: 0,
			sat: 255,
			bri: 255
		});
		lib.light(id).on();
	}
}

export function color (id, value) {
	const matcher = {
		'white': [0, 0],
		'red': [0, 255],
		'blue': [45000, 255]
	};

	let hue = matcher[value][0];
	let saturation = matcher[value][1];

	_state[id].effect = 'none';
	_state[id].hue = hue;
	_state[id].saturation = saturation;

	lib.light(id).setState({
		effect: 'none',
		hue: hue,
		sat: saturation
	});
}

// bulk

export function all (on, colorValue) {
	Object.keys(_state).forEach((id) => {
		_state[id].on = on;
		applyOn(id);
		if (colorValue) color(id, colorValue);
	});
}

export function getState () {
	return _state;
}

// apply state

function applyOn (id) {
	io.update('light', {
		id: id,
		state: _state[id]
	});
	if (_state[id].on) {
		lib.light(id).on();
	} else {
		lib.light(id).off();
	}
}
