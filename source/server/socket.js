const io = require('socket.io')();
const hue = require('./hue');
const config = require('./config');
const credentials = require('../../credentials.json');

export function init (server) {
	io.attach(server);
}

io.on('connection', function (socket) {
	console.info(`${socket.id} connected`);
	socket.on('authenticate', function (password, callback) {
		if (password === credentials.web.password) {
			if (!socket.isAuthenticated) {
				console.info(`${socket.id} authenticated`);
				allow(socket);
				socket.isAuthenticated = true;
				callback(null, 'success');
			} else {
				console.warn(`${socket.id} already authenticated`);
				callback('already authenticated');
			}
		} else {
			console.error(`${socket.id} wrong password`);
			callback('wrong password');
		}
	});

	socket.on('disconnect', function () {
		console.info(`${socket.id} disconnected`);
	});
});

const allow = (socket) => {
	socket.on('light:on', function (options) {
		console.log(`${socket.id} light ${options.id} turned on`);
		hue.light(options.id).on();
	});
	socket.on('light:off', function (options) {
		console.log(`${socket.id} light ${options.id} turned off`);
		hue.light(options.id).off();
	});
	socket.on('light:set', function (options) {
		console.log(`${socket.id} light ${options.id} set to (${options.hue}, ${options.saturation}, ${options.brightness})`);
		hue.light(options.id).setState({
			hue: options.hue,
			sat: options.saturation,
			bri: options.brightness
		})
	})
}
