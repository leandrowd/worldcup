define(['handlebars', 'underscore'], function ( Handlebars, _ ) {
	Handlebars.registerHelper('timezone', function(object, options) {
		var ret;
		_.map(object, function(val,key){
			ret += options.fn({tz: key});
		});

		return ret;
	});
});


