const ctrl = {};

ctrl.index = function(req,res,next){
	res.render('index',{name: '>name<'});
}

module.exports = ctrl;
