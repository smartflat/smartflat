// region import

import fs from 'fs'
import robogen from 'robogen'

// utilities

import * as httpError from '../utilities/http-error'

// endregion

// region static

export const robots = {
	status: 200,
	body: robogen([{
		disallow: '/'
	}]),
	headers: {
		'Content-Type': 'text/plain; charset=utf-8'
	}
}

// endregion
