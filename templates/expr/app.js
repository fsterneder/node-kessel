const express = require('express');
const logger = require('morgan');
const ctrl = require('./controller');

const app = express();

// app set
app.set('views',__dirname + '/views');
app.set('view engine', '>view<');

// app use
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

// router
app.get('/',ctrl.index);

module.exports = app;
