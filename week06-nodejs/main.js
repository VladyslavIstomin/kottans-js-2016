const app = require('./app');
const config = require('config').Server;



app.start(config.port, config.host, () => {
	console.log('listening on ' + config.port)
});
