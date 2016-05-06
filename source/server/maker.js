import IFTTT from 'maker-ifttt';

export default class Maker {

	constructor (options) {
		this.ifttt = new IFTTT(options.token);
	}

	notify (message) {
		this.ifttt.triggerEvent('notify', message, function (res) {
			console.log('notify', message);
			res.on('data', function (chunk) {
				console.log('Response: ' + chunk);
			});
		});
	}

}
