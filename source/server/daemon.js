import request from 'request';

const credentials = require('../../credentials.json');

export function workstation (data) {
	request('https://workstation.dodekeract.report/hook/' + credentials.hookSecret + '/' + data, function (error, response, body) {
		if (error || response.statusCode !== 200) {
			console.log(error, response, body);
		}
	});
}
