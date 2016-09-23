#!/usr/bin/env node

/** Module dependencies **/
const Hapi = require('hapi')
const server = new Hapi.Server()

const port = checkValidPort(Number.parseInt(require('process').argv.splice(2)[0])) || 3000
const ctrl = require('./controller')

// Pug View Engine
server.register(require('vision'),(e) => {
  server.views({
    engines: {>view<: require('>view<')},
    path: __dirname + '/views'
  })
})
server.register(require('inert'),(e) => {if(e){throw e}})

server.connection({port: port})

/* ROUTES */
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
})
// Index
server.route({
  method:'GET',
  path:'/',
  handler: ctrl.index
})

server.start((e) => console.log(`Server running at: ${server.info.uri}`))

// Valid Port Check
function checkValidPort(port){
  if(port < 1024 || port > 65535 || Number.isNaN(port)){
    console.log('invalid port - defaults to 3000')
    return false
  }
  return port
}
