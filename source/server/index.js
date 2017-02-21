// region import

import http from 'http'
import route from 'spirit-router'
import spirit from 'spirit'

// internal

import config from './config'
import * as httpError from './utilities/http-error.js'

// routes

import {html, js} from './routes/client'

// endregion

// region alias

const {host, port} = config.listen

// endregion

// region routes

const app = route.define([
	// client
	route.get('/', html),
	route.get('/bundle.js', js),

	// other
	route.get('/robots.txt', () => ''),
	route.get('/favicon.ico', () => ''),
	route.any('*', httpError.notFound)
])

// endregion

// region start

http.createServer(spirit.node.adapter(app)).listen({host, port}, () =>
	console.info(`listening on http://${host}:${port}`)
)

// endregion
