// imports

import {find as findSensor} from './sensor';
import {find as findLight, all as allLights} from './lights';
import {find as findDevice} from './devices';
import {find as findScene} from './scenes';
import {config, hue, _433Sender, maker, router} from './index';
import wake from './wake-on-lan';
import daemon from './daemon';

// webhooks

router.get(`/hook/${config.web.hookSecret}/scene/:id`, function * (next) {

	let {id} = this.params;

	let scene = findScene(id);

	console.log('scene', id);

	if (scene) {
		scene.run();
		this.body = `scene "${id}" executed`;
	} else {
		this.body = `scene "${id}" not found`;
	}

	yield next;
});

router.get(`/hook/${config.web.hookSecret}/status/:type/:id/:method`, function * (next) {

	let {type, id, method} = this.params;

	console.log('status', type, id, method);

	let message;

	switch (type) {
		case 'sensor':
			let sensor = findSensor(id);
			message = sensor ? sensor.getHumanStatus() : 'sensor not found';
		break;
		case 'light':
			let light = findLight(id);
			message = light ? light.getHumanStatus() : 'light not found';
		break;
	}

	switch (method) {
		case 'notify':
			maker.notify(message);
		break;
		case 'http':
			this.body = message;
		break;
	}

	if (!this.body) this.body = 'IOT OP';

	yield next;
});

router.get(`/hook/${config.web.hookSecret}/control/:id/:action`, function * (next) {

	let {id, action} = this.params;

	console.log('control', id, action);

	switch (action) {
		case 'wake':
			wake(id, (error, data) => {
				if (error) console.error(error);
			});
		break;
		case 'sleep':
			daemon(id, 'power/standby', (error, data) => {
				if (error) console.error(error);
			});
		break;
	}

	this.body = 'IOT OP';

	yield next;
});

router.get(`/hook/${config.web.hookSecret}/light/:id/:action`, function * (next) {

	let {id, action} = this.params;

	console.log('light', id, action);

	let light = findLight(id);

	if (light) {
		switch (action) {
			case 'on':
				light.on();
			break;
			case 'off':
				light.off();
			break;
			case 'toggle':
				light.toggle();
			break;
		}
		this.body = 'IOT OP';
	} else {
		this.body = 'light not found';
	}

	yield next;
});

router.get(`/hook/${config.web.hookSecret}/lights/:action`, function * (next) {

	let {action} = this.params;

	console.log('lights', action);

	switch (action) {
		case 'on':
			allLights.on();
		break;
		case 'off':
			allLights.off();
		break;
		case 'toggle':
			allLights.toggle();
		break;
	}

	this.body = 'IOT OP';

	yield next;
});
