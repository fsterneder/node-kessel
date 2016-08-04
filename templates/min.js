const express = require('express');
const http = require('http');
const input = require('process').argv.splice(2);

const app = express();

app.set('views',__dirname + '/views');
app.set('view engine', '<view>');

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res,next){
  res.render('index');
});

let __port = Number.parseInt(input[0]) || '3000';
checkValidPort(__port);
app.set('port',__port);

app.listen(__port);

function checkValidPort(port){
  if(port < 1024 || port > 65535 || Number.isNaN(port)){
    console.log('invalid port');
    process.exit(1);
  }
  return port;
}