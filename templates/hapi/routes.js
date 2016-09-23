const ctrl = require('./controller')

module.exports = [
	{
		method: 'GET',
		path: '/',
		handler: ctrl.index
	},{
		method: 'GET',
		path: '/{p*}',
		handler: {
			directory: {
				path: __dirname + '/public',
				listing: false
			}
		}
	}
];
