const router = require('koa-router')();

const config = require('../../config.json');

import {exec} from 'child_process';

let _state = {};

router.get('/hook/' + config.web.hookSecret + '/:type/:id', function * (next) {
	let type = this.params.type;
	let id = this.params.id;

	console.log(type, id);

	this.body = 'IOT OP';

	switch (type) {
		case 'power':
			switch (id) {
				case 'standby':
					exec('echo mem | tee /sys/power/state');
				break;
			}
		break;
	}

	yield next;
});

export {
	router
};
