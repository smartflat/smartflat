import Device from './device';
import fritz from 'smartfritz-promise';

export class FritzBox extends Device {

	constructor (options) {
		super(options);

		// fritz.getSessionID(options.user, options.password, {
		// 	host: options.host
		// }).then(sessionID => {
		// 	console.log(sessionID);
		//
		// 	fritz.setGuestWlan(sessionID, true).then(data => {
		// 		console.log(data);
		// 		fritz.getGuestWlan(sessionID).then(data => {
		// 			console.log(`data ${JSON.stringify(data)}`);
		// 		});
		// 	});
		// });
	}

}
