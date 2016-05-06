import lib from 'rpi-433';

import {EventEmitter} from 'events';

export class Sender {

	constructor (options) {
		this.pin = options.pin;
		this.attempts = options.attempts || 10;
		this.timer;
	}

	send (code, callback) {
		clearTimeout(this.timer);

		// send multiple times

		let attempts = 0;

		let ref = this;

		function send () {
			if (attempts++ < ref.attempts) {
				console.info(`433 sending ${code}`);
				lib.sendCode(code, ref.pin);
				ref.timer = setTimeout(send, 500);
			} else {
				callback(null, 'finished sending');
			}
		}

		send();
	}

}

export class Receiver extends EventEmitter {

	constructor (options) {
		super();

		// settings
		this.id = options.id;
		this.pin = options.pin;
		this.debounce = options.debounce;

		// create
		this.sniffer = lib.sniffer(this.pin, this.debounce);

		// listen
		this.sniffer.on('codes', this.update.bind(this));
	}

	update (code) {
		console.log(`433 ${this.id} received: ${code}`);
		this.emit('data', code);
	}

}
