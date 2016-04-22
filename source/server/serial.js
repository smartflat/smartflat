// imports

import {SerialPort} from 'serialport';
const io = require('./socket');

// config

const DEVICES = [{
	id: 'arduino-master',
	port: '/dev/ttyUSB0',
	addresses: [42, 43],
	bauds: 9600
}];

const PROTOCOL = {
	get: 0x00
};

// state

let _state = {
	devices: {},
	discovered: [],
	interval: null
};

// serial communication

DEVICES.forEach((device) => {

	// configure state

	_state.devices[device.id] = {
		opened: false,
		data: {}
	};

	// alias

	let deviceState = _state.devices[device.id];
	let port = deviceState.port;

	// handle serial communication

	port = new SerialPort(device.port, {
		baudrate: device.bauds
	});

	port.on('error', function (error) {
		if (!opened) {
			error = `can't open ${device.id}`;
		}
		console.error(`serial error: ${error}`);
	});

	port.on('open', () => {
		deviceState.opened = true;
		console.info('serial opened');
		port.interval = setInterval(() => {
			device.addresses.forEach((address) => {
				// requestFrom(port, address);
			});
		}, 1000);
	});

	// chunk cache for incomplete lines

	let cache = '';

	port.on('data', (data) => {

		// split chunks on newline

		cache += data;

		if (cache.indexOf('\n') !== -1) {

			let lines = cache.split('\n');
			let content = false;

			for (let i = 0; i < lines.length-1; i++) {

				try {
					content = JSON.parse(lines[i]);
					deviceState.data[content.id] = content;
				} catch (error) {
					console.log(`serial error can't parse JSON: ${lines[i]}`);
				}

			}

			// send to socket

			if (content) {
				let d = deviceState.data[content.id];

				let message = [];

				const add = (type) => {
					if (d[type] !== false) message.push({
						type: type,
						room: content.id,
						value: d[type]
					});
				};

				add('brightness');
				add('humidity');
				add('motion');
				add('temperature');

				io.update('sensors', message);
			}

			// cache incomplete lines

			cache = lines[lines.length-1];

		}

	});
});

require('serialport').list(function (err, ports) {
	ports.filter((i) => i.vendorId).forEach((port) => {
		_state.discovered.push(port);
		console.info(`serial discovered: ${port.comName}`);
	});
});

// utility functions

function requestFrom (port, address) {
	request(port, PROTOCOL.get, address);
}

function request (port, state, data) {
	let message = `${state}${data}`;
	console.info(`serial send: ${message}`);
	port.write(message);
}

// exported functions

export function getState (deviceId, address) {
	return _state[deviceId].data[address];
}
