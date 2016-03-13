const router = require('koa-router')();
const serve = require('koa-static')('build/web');

router.get('*', function * (next) {
	console.log(this.url);
	this.body = '200';
});

export {
	router,
	serve
};
