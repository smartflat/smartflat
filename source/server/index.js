const app    = require('koa')();
const http   = require('./http');
const serve  = http.serve;
const server = require('http').Server(app.callback());
const socket = require('./socket').init(server);
const maker  = require('./maker');

var config = require('./config');

app
	.use(http.serve)
	.use(http.router.routes())
	.use(http.router.allowedMethods())
;

server.listen(config.port, function () {
	console.log('listening on http://127.0.0.1:' + config.port)
});
