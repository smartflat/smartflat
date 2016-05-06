import {update as updateSocket} from './socket';

export default class Light {

	constructor (options) {
		this.id = options.id;
		this.type = options.type;
		this.isOn = false;
	}

	on () {
		this.isOn = true;
		this.apply();
		this.update();
	}

	off () {
		this.isOn = false;
		this.apply();
		this.update();
	}

	set (value) {
		this.isOn = !!value;
		this.apply();
		this.update();
	}

	toggle () {
		this.isOn ^= true;
		this.apply();
		this.update();
	}

	update () {
		updateSocket('light', this.getState());
	}

	getState () {
		return {
			id: this.id,
			isOn: this.isOn,
			type: this.type
		};
	}

	getHumanStatus () {
		return `${this.id} light is ${this.isOn ? 'on' : 'off'}`;
	}

}
