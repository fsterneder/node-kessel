#!/usr/bin/env node

/** Module dependencies **/
const Hapi = require('hapi');
const server = new Hapi.Server();

const _port_ = checkValidPort( Number.parseInt(require('process').argv.splice(2)[0]) ) || 3000

server.connection({port: _port_});

// Hapi Plugins
server.register( [require('vision'), require('inert')],
  (e) => { if(e){ throw e; }

	// View Engine
	server.views({
		engines: { >view<: require('>view<') },
		path: __dirname + '/views'
	});

  // Public static directory serving
  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: {
      directory: {
        path: __dirname + '/public',
        listing: false
      }
    }
  });

  // Index
  server.route({
    method:'GET',
    path:'/',
    handler: function(res,reply){
      reply.view('index',{name: '>name<'});
    }
  });

  server.start( (e) => console.log(`Server running at: ${server.info.uri}`) );
});

// Valid Port Check
function checkValidPort(port){
	if(port < 1024 || port > 65535 || Number.isNaN(port)){
		console.log('invalid port - defaults to 3000');
		return false;
	}
	return port;
}
