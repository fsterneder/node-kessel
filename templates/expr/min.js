const express = require('express');
const http = require('http');
const _port_ = checkValidPort(Number.parseInt(require('process').argv.splice(2)[0])) || 3000

const app = express();

// view engine
app.set('views',__dirname + '/views');
app.set('view engine', '>view<');

// app use
app.use(express.static(__dirname + '/public'));

// routes
app.get('/',function(req,res,next){
  res.render('index',{name:'>name<'});
});

// http server
app.set('port',_port_);
app.listen(_port_);

function checkValidPort(port){
  if(port < 1024 || port > 65535 || Number.isNaN(port)){
    console.log('invalid port - defaults to 3000');
    return false;
  }
  return port;
}
