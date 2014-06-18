define([
	'backbone',
	'communicator',
	'underscore'
],
function( Backbone, Communicator, _ ) {
    'use strict';

	var MatchesCollection = Backbone.Collection.extend({
		url: '/api/matches',

		parse: function(response){
			//return the collection grouped by 'group'
			//view based on http://jsfiddle.net/derickbailey/me4NK/
			var groups = _.groupBy(response.data.group, function(item){
				//c_Phase_en: name of the group
				return item['c_Phase_en']
			});

			return _.toArray(groups);
		}
	});

	return MatchesCollection;
});




