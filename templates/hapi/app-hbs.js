#!/usr/bin/env node

/** Module dependencies **/
const Hapi = require('hapi');
const server = new Hapi.Server();

const _port_ = checkValidPort(Number.parseInt(require('process').argv.splice(2)[0])) || 3000

server.connection({port: _port_});

// Static Serving
server.register(require('inert'),(e) => {if(e){throw e;}})

server.register(require('vision'),(e) => {
	// View Engine
	server.views({
		engines: {hbs: require('handlebars')},
		path: __dirname + '/views',
		layoutPath: __dirname + '/views',
		isCached: false,
		layout: true
  });
	// Routes
	server.route(require('./routes'));
	// Server start
	server.start((e) => {
		if (e) {throw e;}
		console.log('Started server at', server.info.uri);
  });
});

// Valid Port Check
function checkValidPort(port){
	if(port < 1024 || port > 65535 || Number.isNaN(port)){
		console.log('invalid port - defaults to 3000');
		return false;
	}
	return port;
}
