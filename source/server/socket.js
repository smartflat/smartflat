const io = require('socket.io')();
const hue = require('./hue');
const config = require('./config');
const credentials = require('../../credentials.json');

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

	let hueState = hue.getState();
	Object.keys(hueState).forEach((id) => {
		socket.emit('update:light', {
			id: id,
			state: hueState[id]
		})
	});

	// register events

	socket.on('light:toggle', function (options) {
		console.log(`${socket.id} light ${options.id} toggled`);
		hue.toggle(options.id);
	});

	socket.on('light:on', function (options) {
		console.log(`${socket.id} light ${options.id} turned on`);
		hue.on(options.id);
	});
	socket.on('light:off', function (options) {
		console.log(`${socket.id} light ${options.id} turned off`);
		hue.off(options.id);
	});
	// socket.on('light:set', function (options) {
	// 	console.log(`${socket.id} light ${options.id} set to (${options.hue}, ${options.saturation}, ${options.brightness})`);
	// 	hueLegacy.light(options.id).setState({
	// 		hue: options.hue,
	// 		sat: options.saturation,
	// 		bri: options.brightness
	// 	})
	// });
}
