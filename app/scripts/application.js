define([
	'backbone',
	'communicator',
	'models/config',
	'views/timezone-selector',
	'views/display-mode',
	'views/matches',
	'collections/matches'
],

function( Backbone, Communicator, configModel, TimezonesView, DisplayModeView, MatchesView, MatchesCollection ) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		matches: '.matches',
		timezones: '.timezone-selector',
		displayMode: '.display-mode'
	});

	Communicator.command.setHandler('setTimezone', function(timezone){
		configModel.set('timezone', timezone);
	})

	Communicator.command.setHandler('setDisplayMode', function(displayMode){
		configModel.set('displayMode', displayMode);
	})

	/* Add initializers here */
	App.addInitializer( function () {
		Communicator.mediator.trigger("APP:START");

		App.matches.show(new MatchesView({
			collection: new MatchesCollection
		}));

		App.timezones.show(new TimezonesView);
		App.displayMode.show(new DisplayModeView);

	});

	return App;
});
