// reset

console.log("\x1Bc");

// external imports

import http from 'http';
import koa from 'koa';
import koaRouter from 'koa-router';
import serveStatic from 'koa-static';
import {} from 'babel-polyfill';

// export config

export const config = require('../../config.json');
export const credentials = require('../../credentials.json');

// internal imports

import Hue from './hue';
import Maker from './maker';
import {Sender} from './433';
import {initialize as initializeDevices} from './devices';
import {initialize as initializeLights} from './lights';
import {initialize as initializeScenes} from './scenes';
import {initialize as initializeSensor} from './sensor';
import {initialize as initializeSocket} from './socket';
import {initialize as initializeHomeKit} from './homekit';

// execute routes

export const router = koaRouter();
require('./routes');

// setup http

const app = koa();

app
	.use(serveStatic('build/client'))
	.use(router.routes())
	.use(router.allowedMethods())
;

const server = http.Server(app.callback());

server.listen(config.port, function () {
	console.log('listening on http://127.0.0.1:' + config.port)
});

// initialize

initializeDevices(config.devices);
initializeLights(config.lights);
initializeScenes(config.scenes);
initializeSensor(config.sensors);
initializeSocket(server);
initializeHomeKit();

// export instances

export const _433Sender = new Sender({
	pin: 6,
	attempts: 10
});

export const maker = new Maker({
	token: config.services.maker.notification.token
});
