// region import

import fs from 'fs'

// internal

import config from '../config'

// endregion

// region memory

const memory = {
	html: fs.readFileSync(`${__dirname}/../../client/index.html`),
	js: fs.readFileSync(`${__dirname}/../../client/bundle.js`)
}

// endregion

// region serve

export const html = {
	status: 200,
	body: memory.html,
	headers: {
		'Content-Type': 'text/html; charset=utf-8',
		'Cache-Control': config.cache.static
	}
}

export const js = {
	status: 200,
	body: memory.js,
	headers: {
		'Content-Type': 'application/javascript; charset=utf-8',
		'Cache-Control': config.cache.static
	}
}

// endregion
