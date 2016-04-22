const io = require('socket.io')();
const config = require('./config');
const credentials = require('../../credentials.json');

import {hue} from './index';

import scene from './scene';

export default io;

export function init (server) {
	io.attach(server);
}

export function update (name, data) {
	io.to('authenticated').emit(`update:${name}`, data);
}

io.on('connection', function (socket) {
	console.info(`${socket.id} connected`);
	socket.on('authenticate', function (password, callback) {
		if (password === credentials.web.password) {
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

	Object.keys(hue.state).forEach((id) => {
		socket.emit('update:light', {
			id: id,
			state: hue.state[id]
		})
	});

	// register events

	socket.on('light:toggle', (options) => {
		console.log(`${socket.id} light ${options.id} toggled`);
		hue.toggle(options.id);
	});

	socket.on('light:on', (options) => {
		console.log(`${socket.id} light ${options.id} turned on`);
		hue.on(options.id);
	});
	socket.on('light:off', (options) => {
		console.log(`${socket.id} light ${options.id} turned off`);
		hue.off(options.id);
	});
	socket.on('light:color', (options) => {
		console.log(`${socket.id} light ${options.id} set to ${options.color}`);
		hue.color(options.id, options.color);
	});
}
