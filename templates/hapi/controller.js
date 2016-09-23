module.exports = {
	index: function(req,reply){
		reply.view('index',{name: '>name<'});
	}
}
