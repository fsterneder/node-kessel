const ctrl = require('./controller')

module.exports = [
  {
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: __dirname + '/public',
				listing: false
			}
		}
	},{
		method: 'GET',
		path: '/',
		handler: ctrl.index
	}
];
