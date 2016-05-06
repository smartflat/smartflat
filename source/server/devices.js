import SerialDevice from './serial';
import {Bridge as HueBridge} from './hue';
import {Receiver} from './433';
import {FritzBox} from './fritz-box';
import HomeKit from './homekit';

const devices = {};

export function find (id, type) {
	if (devices[id] && devices[id][type]) {
		return devices[id][type];
	} else {
		return false;
	}
}

export function initialize (deviceList) {
	for (let id in deviceList) {
		let device = Object.assign({
			id: id
		}, deviceList[id]);

		function inc (type, callback) {
			if (device.types.includes(type)) {
				devices[id][type] = callback();
			}
		}

		devices[id] = {};

		inc('hue', () => {
			return new HueBridge({
				host: device.host,
				token: device.hue.token
			});
		});

		inc('gpio', () => {
			return {
				todo: true
			};
		});

		inc('homekit', () => {
			return new HomeKit(device.homekit);
		});

		inc('fritz-box', () => {
			return new FritzBox({
				id: device.id,
				host: device.host,
				user: device['fritz-box'].user,
				password: device['fritz-box'].password
			});
		});

		inc('433-receiver', () => {
			return new Receiver({
				id: device.id,
				pin: device['433-receiver'].pin,
				debounce: device['433-receiver'].debounce
			});
		});

		inc('daemon', () => {
			return {
				ssl: device.daemon.ssl,
				host: device.host,
				port: device.daemon.port,
				secret: device.daemon.secret
			};
		});

		inc('wake-on-lan', () => {
			return {
				mac: device.mac
			}
		});

		inc('serial', () => {
			return new SerialDevice(device);
		});
	}
}
