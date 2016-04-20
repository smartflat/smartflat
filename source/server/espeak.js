var child = require('child_process');
var validator = require('validator');
var safeChars = '\\w _:.,;!?%\\"\\\'';

export function speak (message, callback) {
	child.exec('espeak --stdout "' + validator.whitelist(message, safeChars) + '" | aplay', function (error, stdout, stderr) {
		if (error) console.error('espeak', error, stdout, stderr);
		callback && callback();
	});
}
