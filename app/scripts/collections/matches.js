define([
	'backbone',
	'communicator',
	'models/config'
],
function( Backbone, Communicator, configModel ) {
    'use strict';

	var MatchesCollection = Backbone.Collection.extend({
		url: function(){
			return '/api/matches/' + configModel.get('displayMode')
		}
	});

	return MatchesCollection;
});




