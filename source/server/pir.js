const gpio = require('gpio');

const PIR = gpio.export(21, {
	direction: 'in',
	ready: () => {
		console.log('PIR ready');
		PIR._get(_onChange);
		PIR.on('change', _onChange);
	}
});

const LED3 = gpio.export(27, {
	ready: () => {
		console.log('LED3 ready');
	}
});

const _onChange = (value) => {
	LED3.set(value);
}
