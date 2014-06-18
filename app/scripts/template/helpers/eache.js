define(['handlebars'], function ( Handlebars ) {
	Handlebars.registerHelper('eache', function(context, options) {
		var ret = "";
		console.log(context, options);
		for(var i=0, j=context.length; i<j; i++) {
			ret = ret + options.fn(context[i]);
		}

		return ret;
	});
});


