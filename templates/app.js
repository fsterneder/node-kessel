const express = require('express');
const logger = require('morgan');
const ctrl = require('./controller');

const app = express();

app.set('views',__dirname + '/views');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/',ctrl.index);

module.exports = app;
