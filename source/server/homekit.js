import {uuid, Bridge, Accessory, Service, Characteristic} from 'hap-nodejs';
import storage from 'node-persist';
import {getAll as getLights} from './lights';
import {find as findDevice} from './devices';

storage.initSync();

export default class HomeKit {

	constructor (options) {
		this.bridge = new Bridge(options.name, uuid.generate(options.name));

		this.bridge.on('identify', (paired) => {
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

}

export function initialize () {
	let bridge = findDevice('local', 'homekit');
	let lights = getLights();

	for (let id in lights) {
		let light = lights[id];
		bridge.addLight(light);
	}
}

export class HomeKitAccessory extends Accessory {

	constructor (device) {
		var accessoryUUID = uuid.generate(device.id);

		super(device.id, accessoryUUID);

		this.on('identify', function (paired, callback) {
			callback();
			console.log("Identify the light!");
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
