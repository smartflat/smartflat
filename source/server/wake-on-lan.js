import {wake as wakeOnLan} from 'wake_on_lan';

import {find as findDevice} from './devices';

export default function wake (name, callback) {
	let {mac} = findDevice(name, 'wake-on-lan');
	if (mac) {
		wakeOnLan(mac, (error) => {
			if (!error) {
				callback(null, 'success');
			} else {
				console.error(`wol error: ${error}`);
				callback(error);
			}
		});
	} else {
		setImmediate(() => {
			callback('not found');
		});
	}
}
