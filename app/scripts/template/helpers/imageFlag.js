define(['handlebars'], function ( Handlebars ) {
	console.log('Handlebars', Handlebars);
	Handlebars.registerHelper('imageFlag', function(context, options) {
		var title = context;
			image = options.hash.image;

		if(!image) {
			image = 'http://placehold.it/450x250&text=' + title;
		}

		return image;
	});
});


