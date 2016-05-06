import {findmyphone as fmi} from 'find-my-iphone';

import {update} from './socket';

export default class FindMyIPhone {

	constructor (options) {
		this.lib = fmi;
		this.lib.apple_id = options.id;	
		this.lib.password = options.password;
	}

	update () {
		this.lib.getDevices((error, devices) => {
			if (!error) {
				devices.forEach((device) => {
					console.log(`found ${device.name} with location [${device.location.latitude}, ${device.location.longitude}] and ${Math.round(device.batteryLevel*100)}% battery`);
				});
			}
		});
	}

}
