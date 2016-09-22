#!/usr/bin/env node

/** Module dependencies **/
var app = require('../app.js');
var http = require('http');
var input = require('process').argv.splice(2);

var port = Number.parseInt(input[0]) || '3000';

checkValidPort(port);

app.set('port',port);

app.listen(port);

function checkValidPort(port){
  if(port < 1024 || port > 65535 || Number.isNaN(port)){
    console.log('invalid port');
    process.exit(1);
  }
  return port;
}
