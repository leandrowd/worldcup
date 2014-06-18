define([
	'backbone',
	'communicator'
],
function( Backbone, Communicator ) {
    'use strict';

	var MatchesCollection = Backbone.Collection.extend({
		url: '/api/matches',
		parse: function(data){
			return data.data.group
		}
	});

	return MatchesCollection;
});




