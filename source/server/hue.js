import PhilipsHue from 'philips-hue';

import {find as findDevice} from './devices';
import Device from './device';

class Hue {

	constructor (options) {
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

}

export class Bridge extends Device {

	constructor (options) {
		super();
		this.hue = new PhilipsHue();
		this.hue.bridge = options.host;
		this.hue.username = options.token;
		this.update();
	}

	update () {
		let that = this;
		this.hue.getLights().then((lights) => {
			Object.keys(lights).forEach((id) => {
				let light = lights[id];
				that.emit(id, light.state.on);
			});
		});
	}

	set (id, isOn) {
		if (isOn) {
			this.hue.light(id).on();
		} else {
			this.hue.light(id).off();
		}
	}

}

import Light from './light';

export class HueLight extends Light {

	constructor (options) {
		super(options);
		this.bridge = options.bridge;
		this.light = options.light;

		this.hue = findDevice(this.bridge, 'hue');

		let that = this;

		this.hue.on(options.light, (isOn) => {
			that.isOn = !!isOn;
		});
	}

	apply () {
		this.hue.set(this.light, this.isOn);
	}

}
