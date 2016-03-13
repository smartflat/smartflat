import d from '../dispatchers/utilities';
import c from '../constants/utilities';

class Utilities {
	constructor () {

	}

	authenticate () {
		d.dispatch({
			type: c.AUTHENTICATE
		});
	}

	deauthenticate () {
		d.dispatch({
			type: c.DEAUTHENTICATE
		});
	}
}

export default new Utilities();
