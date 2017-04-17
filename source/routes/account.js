// region sign-in

export const signIn = async () => {
	return {
		status: 200,
		body: JSON.stringify({
			user: 'something'
		}),
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	}
}
