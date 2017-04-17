// region import

import http from 'http'
import route from 'spirit-router'
import spirit from 'spirit'

// internal

import * as httpError from './utilities/http-error.js'
import config from './config'
import modules from './utilities/modules'

// routes

import {images, robots} from './routes/static'

// endregion

// region alias

const {host, port} = config.listen

// endregion

// region routes

const app = route.define([
	// client
	route.get('/', {
		status: 307,
		body: `<a href="${config.routes.default}">Redirect</a>`,
		headers: {
			Location: config.routes.default
		}
	}),

	// modules
	...modules(),

	// other
	route.get('/robots.txt', robots),
	route.get('/favicon.ico', () => ''),
	route.any('*', httpError.notFound)
])

// endregion

// region start

http.createServer(spirit.node.adapter(app)).listen({host, port}, () =>
	console.info(`listening on http://${host}:${port}`)
)

// endregion
