var Maker = require('maker-ifttt');

var credentials = require('../../credentials.json');

var trigger = new Maker(credentials.maker.token);

// trigger.triggerEvent('notify', 'Home Started', function (res) {
// 	res.on('data', function (chunk) {
// 		console.log('Response: ' + chunk);
// 	});
// });
