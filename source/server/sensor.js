import {find as findDevice} from './devices';
import {EventEmitter} from 'events';

const sensors = {};

export function find (id) {
	if (sensors[id]) {
		return sensors[id];
	} else {
		return false;
	}
}

export function getAll () {
	return sensors;
}

export function initialize (sensorList) {
	for (let id in sensorList) {

		// add id to sensor

		let sensor = Object.assign({
			id: id
		}, sensorList[id]);

		// add to list

		sensors[id] = new Sensor(sensor);
	}
}

export default class Sensor extends EventEmitter{

	constructor (options) {
		super();

		this.id = options.id;
		this.data = false;
		this.type = options.type;
		this.unit = options.unit;
		this.method = options.method;
		this.room = options.room;

		switch (this.method.type) {
			case 'serial':
				let dev = findDevice(this.method.device, 'serial');
				if (dev) {
					dev.on(`${options.method.slave}:${options.method.id}`, this.update.bind(this));
				} else {
					console.info('could not find serial device');
				}
				console.info(`sensor ${this.id} on serial:${this.method.device}:${this.method.slave}`);
			break;
		}

	}

	update (data) {
		if (data !== this.data) {
			this.data = data;
			this.emit('update', data);
		}
	}

	getStatus () {
		return {
			data: this.data,
			unit: this.unit,
			type: this.type,
			room: this.room
		};
	}

	getHumanStatus () {
		switch (this.type) {
			case 'temperature':
				return `Temperature is ${this.data}\xB0C`;
			break;
			case 'humidity':
				return `Humidity is ${this.data}%`;
			break;
			case 'door':
				return `Door is ${this.data ? 'open' : 'closed'}`;
			break;
			case 'brightness':
				return `Brightness is ${Math.round(this.data/2.55)}%`;
			break;
			case 'motion':
				return `Motion was ${this.data ? 'detected' : 'not detected'}`;
			break;
			default: return `unknown sensor type ${this.type}`;
		}
	}

}
