import Maker from 'maker-ifttt';

const credentials = require('../../credentials.json');

const trigger = new Maker(credentials.maker.token);

export function notify (message) {
	trigger.triggerEvent('notify', message, function (res) {
		console.log('notify', message);
		res.on('data', function (chunk) {
			console.log('Response: ' + chunk);
		});
	});
}
