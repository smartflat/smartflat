import {wake} from 'wake_on_lan';
const credentials = require('../../credentials.json');

export function workstation () {
	wake(credentials.mac.workstation, function (error) {
		console.error('wol', error);
	});
}
