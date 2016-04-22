const router = require('koa-router')();
const serve = require('koa-static')('build/client');

const gpio = require('./gpio');
const hue = require('./hue');
const maker = require('./maker');
const wake = require('./wake-on-lan');
const daemon = require('./daemon');
const dht22 = require('./dht22');
const pir = require('./pir');
const espeak = require('./espeak');

const _433 = require('./433');

const credentials = require('../../credentials.json');

let _state = {};

router.get('/hook/' + credentials.hookSecret + '/:type/:id/:action', function * (next) {
	let type = this.params.type;
	let id = this.params.id;
	let action = this.params.action

	console.log(type, id, action);

	this.body = 'IOT OP';

	switch (type) {
		case 'hue':
			switch (id) {
				case 'all':
					switch (action) {
						case 'on':
							hue.all(true, 'white');
						break;
						case 'off':
							hue.all(false);
						break;
					}
				break;
				default:
					switch (action) {
						case 'on':
							hue.set(id, true);
							hue.color(id, 'white');
						break;
						case 'off':
							hue.set(id, false);
						break;
						case 'toggle':
							hue.toggle(id);
							hue.color(id, 'white');
						break;
					}
			}
		break;
		case 'scene':
			switch (id) {
				case 'night':
					hue.set(2, true);
					hue.rainbow(2);
					hue.set(1, false);
				break;
				case 'rainbow':
					hue.set(1, true);
					hue.set(2, true);
					hue.color(1, 'red');
					hue.color(2, 'blue');
					hue.rainbow(1);
					hue.rainbow(2);
					_433.speak('Rainbows everywhere!');
				break;
			}
		break;
		case 'status':
			let message;
			switch (id) {
				case 'door':
					message = 'Door is ' + (gpio.getState().door.open ? 'open' : 'closed');
					switch (action) {
						case 'notify':
							maker.notify(message);
						break;
						case 'speak':
							_433.speak(message);
						break;
					}
				break;
				case 'temperature':
					message = 'Temperature is ' + dht22.getState().temperature + '\xB0C and Humidity is ' + dht22.getState().humidity + '%';
					switch (action) {
						case 'notify':
							maker.notify(message);
						break;
						case 'speak':
							_433.speak(message);
						break;
					}
				break;
				case 'pir':
					message = 'Motion was ' + (pir.getState().pir ? 'detected.' : 'not detected.');
					switch (action) {
						case 'notify':
							maker.notify(message);
						break;
						case 'speak':
							_433.speak(message);
						break;
					}
				break;
			}
		break;
		case 'control':
			switch (id) {
				case 'workstation':
					switch (action) {
						case 'wake':
							wake.workstation();
						break;
						case 'sleep':
							daemon.workstation('power/standby');
						break;
					}
				break;
				case 'tv':
					switch (action) {
						case 'wake':
							// wake.tv();
						break;
					}
				break;
				case 'speaker':
					switch (action) {
						case 'on':
							_433.power(true);
						break;
						case 'off':
							_433.power(false);
						break;
						case 'toggle':
							_433.toggle();
						break;
					}
				break;
			}
		break;
	}

	yield next;
});

export {
	router,
	serve
};
