const PhilipsHue = require('philips-hue');

const io = require('./socket');

export default class Hue {

	constructor (options) {

		// setup bridge

		this.lib = new PhilipsHue();

		this.lib.bridge = options.host;
		this.lib.username = options.token;

		// setup state

		this.state = {};

		// get state from bridge

		let stateReference = this.state;

		this.lib.getLights().then(function (lights) {
			Object.keys(lights).forEach((item) => {
				let light = lights[item];
				stateReference[item] = {
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

	toggle (id) {
		this.state[id].on ^= 1;
		this.applyOn(id);
	}

	set (id, on) {
		if (this.state[id] !== on) {
			this.state[id].on = on;
			this.applyOn(id);
		}
	}

	rainbow (id) {
		if (this.state[id].effect !== 'colorloop') {
			this.state[id].effect = 'colorloop';
			this.state[id].on = true;
			this.lib.light(id).setState({
				effect: 'colorloop'
			});
			this.applyOn(id);
		}
	}

	color (id, value) {
		const matcher = {
			'white': [0, 0],
			'red': [0, 255],
			'blue': [45000, 255],
			'yellow': [10000, 255]
		};

		let hue = matcher[value][0];
		let saturation = matcher[value][1];

		this.state[id].effect = 'none';
		this.state[id].hue = hue;
		this.state[id].saturation = saturation;

		this.lib.light(id).setState({
			effect: 'none',
			hue: hue,
			sat: saturation
		});
	}

	// bulk

	all (on, colorValue) {
		Object.keys(this.state).forEach((id) => {
			this.state[id].on = on;
			this.applyOn(id);
			if (colorValue) this.color(id, colorValue);
		});
	}

	// apply state

	applyOn (id) {
		io.update('light', {
			id: id,
			state: this.state[id]
		});
		if (this.state[id].on) {
			this.lib.light(id).on();
		} else {
			this.lib.light(id).off();
		}
	}

}
