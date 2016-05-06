// var DOOR_0 = gpio.export(24, {
// 	direction: 'in',
// 	ready: () => {
// 		console.log('DOOR_0 ready');
// 		DOOR_0._get(status);
// 		DOOR_0.on('change', status);
// 	}
// });
//
// var BUTTON_0 = gpio.export(19, {
// 	direction: 'in',
// 	ready: () => {
// 		console.log('BUTTON_0 ready');
// 		BUTTON_0.on('change', (v) => {
// 			if (v === 1) {
// 				console.log('BUTTON_0 pressed');
// 				hue.set(1, false);
// 				hue.set(2, false);
// 			}
// 		});
// 	}
// });

// var initial = true;
// function status (val) {
// 	_state.door = {
// 		open: !val
// 	};
// 	led1.set(val);
//
// 	var message = 'Door ' + ((val === 1) ? 'closed' : 'opened');
// 	if (initial) {
// 		message += ' (initial)';
// 		initial = false;
// 	}
// 	if (notify) {
// 		maker.triggerEvent('notify', message, function (res) {
// 			if (res.statusCode !== 200) {
// 				console.log('Could not send notification.');
// 			}
// 		});
// 	}
// 	if (val === 1) close();
// 	if (val === 0) open();
// }

// var interval;
// function open () {
// 	console.log('open');
// 	led2.set(1);
//
// 	hue.color(1, 'blue');
// 	hue.color(2, 'red');
// 	if (pingIPhone) {
// 		ping.sys.probe('iphone', function (isAlive) {
// 			if (!isAlive) danger();
// 		});
// 	} else {
// 		danger();
// 	}
// }

// function danger () {
// 	var flip = false;
// 	interval = setInterval(() => {
// 		if (flip) {
// 			hue.color(1, 'blue');
// 			hue.color(2, 'red');
// 			led2.set(1);
// 		} else {
// 			hue.color(1, 'red');
// 			hue.color(2, 'blue');
// 			led2.set(0);
// 		}
// 		flip ^= true;
// 	}, 500);
// }

// function close () {
// 	clearInterval(interval);
// 	console.log('close');
// 	hue.color(1, 'white');
// 	hue.color(2, 'white');
// 	led2.set(0);
// }

import wpi from 'wiring-pi';
import Light from './light';

wpi.setup('gpio');

export class GPIOLight extends Light {

	constructor (options) {
		super(options);
		this.pin = options.pin;
		wpi.pinMode(this.pin, wpi.OUTPUT);
	}

	apply () {
		wpi.digitalWrite(this.pin, this.isOn ? 1 : 0);
	}

}
