const router = require('koa-router')();
const serve = require('koa-static')('build/web');

const gpio = require('./gpio');
const hue = require('./hue');
const maker = require('./maker');
const wake = require('./wake-on-lan');

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
			}
		break;
		case 'status':
			switch (id) {
				case 'door':
					switch (action) {
						case 'notify':
							maker.notify('Door is ' + (gpio.getState().door.open ? 'open' : 'closed'));
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
