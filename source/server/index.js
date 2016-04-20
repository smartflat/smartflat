require('babel-core/register');
require('babel-polyfill');

const app    = require('koa')();
const http   = require('./http');
const gpio   = require('./gpio');
const server = require('http').Server(app.callback());
const socket = require('./socket').init(server);
const maker  = require('./maker');
const dht22  = require('./dht22');
const pir    = require('./pir');
const hue    = require('./hue');
const config = require('./config');
const _433   = require('./433');
const serial = require('./serial');

app
	.use(http.serve)
	.use(http.router.routes())
	.use(http.router.allowedMethods())
;

server.listen(config.port, function () {
	console.log('listening on http://127.0.0.1:' + config.port)
});

// initialize hue state
hue.initialize();
