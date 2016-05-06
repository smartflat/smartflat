const lights = {};

import {GPIOLight} from './gpio';
import {HueLight} from './hue';

export function find (id) {
	if (lights[id]) {
		return lights[id];
	} else {
		return false;
	}
}

export function getAll () {
	return lights;
}

export function initialize (lightList) {
	for (let id in lightList) {
		let light = Object.assign({
			id: id
		}, lightList[id]);

		switch (light.type) {
			case 'gpio':
				lights[id] = new GPIOLight(light);
			break;
			case 'hue':
				lights[id] = new HueLight(light);
			break;
		}
	}
}

export const all = {
	on: () => {
		all.value = true;
		all.apply();
	},
	off: () => {
		all.value = false;
		all.apply();
	},
	toggle: () => {
		all.value ^= true;
		all.apply();
	},
	apply: () => {
		for (let id in lights) {
			let light = lights[id];
			light.set(all.value);
		}
	}
};

export function list () {
	let result = [];

	for (let id in lights) {
		let light = lights[id];
		result.push(light.getState());
	}

	return result;
}

// temporary code
// import bitwise from 'bitwise';
//
// setTimeout(() => {
// 	let leds = [find('blue'), find('red'), find('yellow'), find('green'), find('red-4'), find('red-5'), find('red-6'), find('red-7')];
// 	let iteration = 0;
// 	let mode = 'bits';
// 	setInterval(() => {
// 		let bits = bitwise.readByte(iteration%256);
// 		switch (mode) {
// 			case 'random':
// 				leds.forEach((led) => {
// 					led.set(Math.random() >= .5);
// 				});
// 			break;
// 			case 'weird-bits':
// 				leds.forEach((led, index) => {
// 					if (bits[index]) led.toggle();
// 				});
// 			break;
// 			case 'bits':
// 				leds.forEach((led, index) => {
// 					led.set(bits[index]);
// 				});
// 			break;
// 			case 'single':
// 				leds.forEach((led, index) => {
// 					led.set(iteration % 12 === (
// 						(iteration % 12 > 6) ? (6 + index) : (6 - index)
// 					));
// 				});
// 			break;
// 			case 'loop':
// 				leds.forEach((led, index) => {
// 					led.set(iteration % 8 === index);
// 				});
// 			break;
// 		}
// 		iteration++;
// 	}, 1000);
// }, 500);
