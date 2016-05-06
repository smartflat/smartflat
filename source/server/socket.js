// external imports

import sio from 'socket.io';

// internal imports

import {hue, config} from './index';
import {find as findDevice} from './devices';
import {find as findLight, list as listLights} from './lights';
import scene from './scene';

// export

let io = sio();

export default io;

export function initialize (server) {
	io.attach(server);
}

export function update (name, data) {
	io.to('authenticated').emit(`update:${name}`, data);
}

// handle websockets

io.on('connection', function (socket) {
	console.info(`${socket.id} connected`);
	socket.on('authenticate', function (password, callback) {
		if (password === config.web.password) {
			if (!socket.isAuthenticated) {
				console.info(`${socket.id} authenticated`);
				allow(socket);
				callback(null, 'success');
			} else {
				console.warn(`${socket.id} already authenticated`);
				callback('already authenticated');
			}
		} else {
			console.error(`${socket.id} wrong password ${password}`);
			callback('wrong password');
		}
	});

	socket.on('disconnect', function () {
		console.info(`${socket.id} disconnected`);
	});
});

const allow = (socket) => {
	socket.join('authenticated');
	socket.isAuthenticated = true;

	// send initial data

	socket.emit('initial-data', {
		lights: listLights()
	});

	// register events

	socket.on('light:toggle', (options) => {
		console.log(`${socket.id} light ${options.id} toggled`);
		let light = findLight(options.id);
		if (light) light.toggle();
	});

	socket.on('light:on', (options) => {
		console.log(`${socket.id} light ${options.id} turned on`);
		let light = findLight(options.id);
		if (light) light.on();
	});
	socket.on('light:off', (options) => {
		console.log(`${socket.id} light ${options.id} turned off`);
		let light = findLight(options.id);
		if (light) light.off();
	});
	socket.on('light:color', (options) => {
		console.log(`${socket.id} light ${options.id} set to ${options.color}`);
		hue.color(options.id, options.color);
	});
}
