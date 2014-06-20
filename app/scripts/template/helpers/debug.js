define(['handlebars', 'underscore'], function ( Handlebars, _ ) {
	Handlebars.registerHelper('debug', function(object, options) {
		console.log(object);
		return  object;
	});
});


