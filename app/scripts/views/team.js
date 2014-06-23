define([
	'backbone',
	'communicator',
	'hbs!tmpl/team'
],
function( Backbone, Communicator, teamTemplate) {
    'use strict';

	var MatchesView = Backbone.Marionette.ItemView.extend({
		template: teamTemplate,
		tagName: 'tr'
	});

	return MatchesView;
});




