const Hue = require('philips-hue');
const hue = new Hue();

var credentials = require('../../credentials.json');

hue.bridge = credentials.hue.host;
hue.username = credentials.hue.token;

module.exports = hue;
