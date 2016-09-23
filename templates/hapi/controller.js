const ctrl = {};

ctrl.index = function(req,reply){
  reply.view('index',{name: '>name<'});
}

module.exports = ctrl;
