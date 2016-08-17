require('babel-core/register');
require('babel-polyfill');

const app    = require('koa')();
const http   = require('./http');
const server = require('http').Server(app.callback());

const port = 60000;

app
	.use(http.router.routes())
	.use(http.router.allowedMethods())
;

console.log(process.getgid() === 0 ? 'running as root' : `running as user ${process.getgid()}`);

server.listen(port, function () {
	console.log('listening on http://127.0.0.1:' + port)
});
