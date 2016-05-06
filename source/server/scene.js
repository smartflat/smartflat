import {config, credentials} from './index';
import {find as findLight} from './lights';

export default class Scene {

	constructor (options) {
		this.lights = [];
		for (let id in options.lights) {
			this.lights.push(Object.assign({
				id: id
			}, options.lights[id]));
		}
	}

	run () {
		this.lights.forEach((light) => {
			let dev = findLight(light.id);
			if (dev) {
				dev.set(light.on);
			} else {
				console.error(`scene: light ${light.id} not found`);
			}
		});
	}

}
