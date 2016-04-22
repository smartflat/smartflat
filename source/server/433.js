var lib = require('rpi-433');
var espeak = require('./espeak');

const RECEIVE_PIN = 2;
const SEND_PIN = 6;

const _state = {
	powered: false
};

// var sniffer = lib.sniffer(RECEIVE_PIN, 500);
// sniffer.on('codes', function (code) {
// 	console.log('Code received: ' + code);
// });

export function power (value) {
	_state.powered = value;
	applyPower();
}

export function getState () {
	return _state;
}

export function toggle () {
	_state.powered ^= true;
	applyPower();
}

export function speak (message) {
	_state.powered = true;
	applyPower(function () {
		espeak.speak(message, function () {
			power(false);
		});
	});
}

let timer;
function applyPower (callback) {
	clearTimeout(timer);
	let code = _state.powered ? 4261201 : 4261204;
	let attempts = 0;

	function send () {
		if (attempts++ < 10) {
			console.info(433, 'sending ' + code);
			lib.sendCode(code, SEND_PIN);
			timer = setTimeout(send, 500);
		} else {
			callback && callback();
		}
	}

	send();
}

// initialize
applyPower();
