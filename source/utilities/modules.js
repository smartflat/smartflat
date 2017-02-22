// region import

import fs from 'fs'
import path from 'path'
import route from 'spirit-router'

// internal

import api from './api'

// endregion

// region routes

const modules = fs
	.readdirSync(`${__dirname}/../../modules`)
	.map(name => path.join(`${__dirname}/../../modules`, name))
	.filter(name => fs
		.statSync(name)
		.isDirectory()
	)
	.map(name => require(`${name}/build/info.js`).default({api}))

// endregion

// region serve

export default () => modules
	.map(({name, routes}) => routes
		.map(([method, path, dependencies, handler]) => route[method](`/m/${name}/${path}`, dependencies, handler))
	)
	.reduce((a, b) => [...a, ...b], [])

// endregion
