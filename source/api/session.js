// region import

import crypto from 'crypto'
import jwt from 'jsonwebtoken'

// internal

import {provide} from '../utilities/modules'

// endregion

// region crypto

const key = 'secret'
const hashPassword = async ({password, salt}) => new Promise((resolve, reject) =>
	crypto.pbkdf2(key, salt, 64000, 512, 'sha512', (error, key) => error
		? reject(error)
		: resolve(key.toString('base64'))
	)
)

// endregion

// region export

export const verify = async (token) =>
	jwt.verify(token, key, {
		algorithms: ['HS256']
	})

export const create = async ({name, password}) => {
	const {salt, hash} = await provide.user({name})
	const realHash = await hashPassword({password, salt})

	if (hash === realHash) return jwt.sign({
		name
	}, key, {
		expiresIn: '10s'
	})

	throw 'wrong password'
}

// endregion
