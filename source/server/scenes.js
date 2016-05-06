const scenes = {};

import Scene from './scene';

export function find (id) {
	if (scenes[id]) {
		return scenes[id];
	} else {
		return false;
	}
}

export function initialize (sceneList) {
	for (let id in sceneList) {
		let scene = Object.assign({
			id: id
		}, sceneList[id]);
		scenes[id] = new Scene(scene);
	}
}
