import {uuid, Bridge, Accessory, Service, Characteristic} from 'hap-nodejs';
import storage from 'node-persist';
import {getAll as getLights} from './lights';
import {find as findDevice} from './devices';
import {getAll as getSensors, find as findSensor} from './sensor';
import sendToDaemon from './daemon';
import wake from './wake-on-lan';

storage.initSync();

export default class HomeKit {

	constructor (options) {
		this.bridge = new Bridge(options.name, uuid.generate(options.name));

		this.bridge.on('identify', (paired, callback) => {
			console.log(`homekit ${paired}`);
			callback();
		});

		this.bridge.publish({
			username: options.user,
			port: options.port,
			pincode: options.password,
			category: Accessory.Categories.BRIDGE
		});
	}

	addLight (light) {
		this.bridge.addBridgedAccessory(new HomeKitLight(light));
	}

	addDaemon (id) {11
		const daemon = Object.assign(findDevice(id, 'daemon'), {
			id
		});
		this.bridge.addBridgedAccessory(new HomeKitDaemon(daemon));
	}

	addLightSensor (sensor) {
		console.log(`adding ${sensor.id}`);
		this.bridge.addBridgedAccessory(new HomeKitLightSensor(Object.assign({},sensor)));
	}

	addTemperatureSensor (sensor) {
		console.log(`adding ${sensor.id}`);
		this.bridge.addBridgedAccessory(new HomeKitTemperatureSensor(Object.assign({},sensor)));
	}

	addMotionSensor (sensor) {
		console.log(`adding ${sensor.id}`);
		this.bridge.addBridgedAccessory(new HomeKitMotionSensor(Object.assign({},sensor)));
	}

	addHumiditySensor (sensor) {
		console.log(`adding ${sensor.id}`);
		this.bridge.addBridgedAccessory(new HomeKitHumiditySensor(Object.assign({},sensor)));
	}

}

export function initialize () {
	const bridge = findDevice('local', 'homekit');
	const lights = getLights();
	const sensors = getSensors();

	for (let id in lights) {
		const light = lights[id];
		bridge.addLight(light);
	}

	for (let id in sensors) {
		const sensor = sensors[id];
		switch (sensor.type) {
			case 'brightness':
				bridge.addLightSensor(sensor);
			break;
			case 'humidity':
				bridge.addHumiditySensor(sensor);
			break;
			case 'motion':
				bridge.addMotionSensor(sensor);
			break;
			case 'temperature':
				bridge.addTemperatureSensor(sensor);
			break;
			default:
				console.error(`unknown sensor type ${sensor}`);
		}
	}

	bridge.addDaemon('workstation');
}

export class HomeKitAccessory extends Accessory {

	constructor (device) {
		var accessoryUUID = uuid.generate(device.id);

		super(device.id, accessoryUUID);

		this.on('identify', function (paired, callback) {
			callback();
			console.log("identifying");
		});
	}

}

export class HomeKitLight extends HomeKitAccessory {

	constructor (device) {
		super(device);

		this.light = device;

		this
			.addService(Service.Lightbulb, device.id)
			.getCharacteristic(Characteristic.On)
			.on('set', function(value, callback) {
				this.light.set(value);
				callback();
			}.bind(this));

		this
			.getService(Service.Lightbulb)
			.getCharacteristic(Characteristic.On)
			.on('get', function(callback) {
				callback(null, this.light.isOn);
			}.bind(this));
	}

}

export class HomeKitDaemon extends HomeKitAccessory {

	constructor (device) {
		super(device);

		this.light = device;

		this.state = 1;

		this
			.addService(Service.Lightbulb, device.id)
			.getCharacteristic(Characteristic.On)
			.on('set', function(value, callback) {
				if (!value) {
					sendToDaemon(this.light.id, 'power/standby', () => {
						callback();
					});
				} else {
					wake(this.light.id, (error, data) => {
						console.error(error, data);
						callback();
					});
				}
				this.state = value;
			}.bind(this));

		this
			.getService(Service.Lightbulb)
			.getCharacteristic(Characteristic.On)
			.on('get', function(callback) {
				callback(null, this.state);
			}.bind(this));
	}

}

export class HomeKitLightSensor extends HomeKitAccessory {

	constructor (device) {
		super(device);
		this.device = device;
		this
			.addService(Service.TemperatureSensor)
			.getCharacteristic(Characteristic.CurrentTemperature)
			.on('get', callback => {
				callback(null, findSensor(this.device.id).getStatus().data);
			});
	}

}

export class HomeKitTemperatureSensor extends HomeKitAccessory {

	constructor (device) {
		super(device);
		this.device = device;
		this
			.addService(Service.TemperatureSensor)
			.getCharacteristic(Characteristic.CurrentTemperature)
			.on('get', callback => {
				callback(null, findSensor(this.device.id).getStatus().data);
			});
	}

}

export class HomeKitMotionSensor extends HomeKitAccessory {

	constructor (device) {
		super(device);
		this.device = device;
		this
			.addService(Service.MotionSensor)
			.getCharacteristic(Characteristic.MotionDetected)
			.on('get', callback => {
				findSensor(this.device.id).getStatus();
				callback(null, findSensor(this.device.id).getStatus().data);
			});
	}

}

export class HomeKitHumiditySensor extends HomeKitAccessory {

	constructor (device) {
		super(device);
		this.device = device;
		this
			.addService(Service.HumiditySensor)
			.getCharacteristic(Characteristic.CurrentRelativeHumidity)
			.on('get', callback => {
				findSensor(this.device.id).getStatus();
				callback(null, findSensor(this.device.id).getStatus().data);
			});
	}

}
