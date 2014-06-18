define([
	'backbone',
	'communicator',
	'views/timezone-selector',
	'views/matches',
	'collections/matches'
],

function( Backbone, Communicator, TimezonesView, MatchesView, MatchesCollection ) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		matches: '.matches',
		timezones: '.timezone-selector'
	});

	App.matches.show(new MatchesView({
		collection: new MatchesCollection
	}));

	App.timezones.show(new TimezonesView);

	/* Add initializers here */
	App.addInitializer( function () {
		Communicator.mediator.trigger("APP:START");
	});

	return App;
});
