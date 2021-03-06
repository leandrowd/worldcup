define([
	'backbone',
	'communicator'
],
function( Backbone, Communicator ) {
    'use strict';

	var MatchesCollection = Backbone.Collection.extend({
		url: function(){
			var displayMode = Communicator.reqres.request('getDisplayMode');
			return '/api/matches/' + displayMode;
		}
	});

	return MatchesCollection;
});




