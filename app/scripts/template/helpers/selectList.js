define(['handlebars', 'underscore'], function ( Handlebars, _ ) {
	Handlebars.registerHelper('selectList', function(object, options) {
		var ret = [];

		_.map(object, function(val,key){
			var data = {
				text: key,
				selected: (_.isObject(val) && val.selected) ? 'selected="true"' : ''
			};

			ret.push(options.fn(data));
		});

		return  ret.join('') ;
	});
});


