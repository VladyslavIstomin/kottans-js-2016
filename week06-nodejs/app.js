const http = require('http');

class App {

	use(callback) {
		return this.server = http.createServer(callback);
	}

	start(port, host, callback) {
		this.server.listen(port, host, callback);
	}
}

module.exports = new App();