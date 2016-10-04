module.exports = {
	index: function(request,reply){
		reply.view('index',{name: '>name<'});
	}
}
