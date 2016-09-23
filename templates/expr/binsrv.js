#!/usr/bin/env node

/** Module dependencies **/
var app = require('../app.js');
var http = require('http');

const _port_ = checkValidPort(Number.parseInt(require('process').argv.splice(2)[0])) || 3000

checkValidPort(port);

app.set('port',_port_);

app.listen(port);

function checkValidPort(port){
  if(port < 1024 || port > 65535 || Number.isNaN(port)){
    console.log('invalid port - defaults to 3000');
    return false;
  }
  return port;
}
