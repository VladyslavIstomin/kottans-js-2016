const http = require('http');

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello world');
});

class App {
	constructor() {
		this.server = http.createServer((req, res) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/plain');
			res.end('Hello world');
		});
	}

	start(port, host, callback) {
		this.server.listen(port, host, callback);
	}
}

module.exports = new App();