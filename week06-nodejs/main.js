const app = require('./app');
const config = require('config').Server;

app.use((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	console.log("url", req.url);
	console.log("method", req.method);
	res.end('Hello world');
});

app.start(config.port, config.host, () => {
	console.log('listening on ' + config.port)
});
