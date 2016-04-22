require('babel-core/register');
require('babel-polyfill');

// configuration

const credentials = require('../../credentials.json');

// legacy imports

const app    = require('koa')();
const http   = require('./http');
const gpio   = require('./gpio');
const server = require('http').Server(app.callback());
const socket = require('./socket').init(server);
const maker  = require('./maker');
const dht22  = require('./dht22');
const pir    = require('./pir');
const config = require('./config');
const _433   = require('./433');
const serial = require('./serial');

// imports

import Hue from './hue';

// setup http

app
	.use(http.serve)
	.use(http.router.routes())
	.use(http.router.allowedMethods())
;

server.listen(config.port, function () {
	console.log('listening on http://127.0.0.1:' + config.port)
});

// export initialized modules

export let hue = new Hue(credentials.hue);
