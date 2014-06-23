define([
	'backbone',
	'communicator',
	'underscore'
],
function( Backbone, Communicator ) {
    'use strict';

	var MatchesCollection = Backbone.Collection.extend({
		url: '/api/teams',
	});

	return MatchesCollection;
});




