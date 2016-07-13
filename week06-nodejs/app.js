const http = require('http');

class App {

	constructor() {
		this.serverBody = []
	}

	use() {
		for (let i=0; i<arguments.length; i++) {
			this.serverBody.push(arguments[i])
		}
	}

	start(port, host, callback) {
		http.createServer((req, res) => {

			for (let i=0; i<this.serverBody.length; i++) {
				this.serverBody[i](req, res)
			}

		}).listen(port, host);
		callback();
	}
}

module.exports = new App();