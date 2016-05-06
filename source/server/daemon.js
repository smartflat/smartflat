import request from 'request';
import {find as findDevice} from './devices';

export default function sendTo (id, hook, callback) {
	let {ssl, host, port, secret} = findDevice(id, 'daemon');
	if (host) {
		let url = `http${ssl ? 's' : ''}://${host}:${port}/hook/${secret}/${hook}`;
		request(url, (error, response, body) => {
			if (error || response.statusCode !== 200) {
				console.error(`daemon ${id} error: ${error} ${response} ${body} on ${url}`);
				callback(error || response.statusCode);
			} else {
				callback(null, 'success');
			}
		});
	} else {
		setImmediate(() => {
			callback('not-found');
		});
	}
}
