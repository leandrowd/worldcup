define([
	'backbone',
	'communicator',
	'underscore'
],
function( Backbone, Communicator ) {
    'use strict';

	var MatchesCollection = Backbone.Collection.extend({
		url: '/api/teams',

		parse: function(response){
			var groups =  _.groupBy(response.data, 'c_Group');
			return _.toArray(groups);
		}
	});

	return MatchesCollection;
});




