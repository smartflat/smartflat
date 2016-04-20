const gpio = require('gpio');
const _433 = require('./433');

const _state = {
	pir: 0
};

const PIR = gpio.export(21, {
	direction: 'in',
	ready: () => {
		console.log('PIR ready');
		PIR._get(_onChange);
		PIR.on('change', _onChange);
	}
});

const LED3 = gpio.export(22, {
	ready: () => {
		console.log('LED3 ready');
	}
});

const _onChange = (value) => {
	LED3.set(value);
	if (value) _433.speak('Hello, Dodekeract');
	_state.pir = value;
}

export function getState () {
	return _state;
}
