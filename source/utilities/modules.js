// region import

import body from 'spirit-body'
import fs from 'fs'
import path from 'path'
import route from 'spirit-router'

// internal

import api from '../api'

// endregion

// region modules
const modules = fs
	.readdirSync(`${__dirname}/../../modules`)
	.map(name => path.join(`${__dirname}/../../modules`, name))
	.filter(name => fs
		.statSync(name)
		.isDirectory()
	)
	.map(name => require(`${name}/build/info.js`).default({api}))
// endregion

// region provide & subscribe
export const provide = {}
export const subscribes = {
	user: []
}
export const subscribe = {
	user: (...args) => subscribes.user.forEach(...args)
}

modules.forEach(module => {
	console.log(module)
	if (module.subscribe) {
		if (module.subscribe.user)
			subscribes.user.push(module.subscribe.user)
	}
	if (module.provide) {
		if (module.provide.user)
			provide.user = module.provide.user
	}
})
// endregion

// region serve
export default () => modules
	.map(({name, routes}) => routes
		.map(([method, path, dependencies, handler]) => {
			if (dependencies.includes('body')) return route.wrap(
				route[method](
					`/m/${name}/${path}`,
					dependencies,
					handler
				),
				[body]
			)
			else return route[method](
				`/m/${name}/${path}`,
				dependencies,
				handler
			)
		})
	)
	.reduce((a, b) => [...a, ...b], [])
// endregion
