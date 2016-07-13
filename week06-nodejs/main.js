const app = require('./app');
const config = require('config').Server;

let log1 = (req, res)  => {
	console.log("url", req.url);
	console.log("method", req.method);
};

let log2 = (req, res) => {
	console.log(req.headers);
	res.end("Hello World");
};

app.use(log1, log2);

app.start(config.port, config.host, () => {
	console.log('listening on ' + config.port)
});
