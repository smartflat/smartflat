// region 400

export const notFound = {
	status: 404,
	body: JSON.stringify({
		message: 'Not Found'
	}, null, '\t'),
	headers: {
		'Content-Type': 'application/javascript; charset=utf-8'
	}
}
