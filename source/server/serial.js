require('serialport').list(function (err, ports) {
	ports.filter((i) => i.vendorId).forEach((port) => {
		console.info(`serial discovered: ${port.comName}`);
	});
});

import {update as updateSocket} from './socket';
import {EventEmitter} from 'events';
import {SerialPort, parsers as SerialParsers} from 'serialport';

export default class SerialDevice extends EventEmitter {

	constructor (device) {
		super();

		let ref = this;

		this.opened = false;

		this.id = device.id;

		this.port = new SerialPort(device.serial.port, {
			baudrate: device.serial.bauds,
			parser: SerialParsers.readline('\n')
		});

		// listen for errors

		this.port.on('error', function (error) {
			if (!ref.opened) {
				error = `can't open ${device.id}`;
			}
			console.error(`serial error: ${error}`);
		});

		this.port.on('open', () => {
			ref.opened = true;
			console.info(`serial opened: ${ref.id}`);
		});

		this.port.on('data', (data) => {
			try {
				let content = JSON.parse(data);

				ref.data = content;

				let message = [];

				const add = (type) => {
					if (content[type] !== false) message.push({
						type: type,
						room: content.id,
						value: content[type]
					});
					if (content[type] !== false) {
						this.emit(`${content.id}:${type}`, content[type]);
					}
				};

				add('brightness');
				add('humidity');
				add('motion');
				add('temperature');

				updateSocket('sensors', message);

			} catch (error) {
				console.error(`serial error can't parse JSON: ${data} ${error}`);
			}
		});
	}

}
