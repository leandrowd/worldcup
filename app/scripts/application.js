define([
	'backbone',
	'communicator',
	'views/timezone-selector',
	'views/matches',
	'collections/matches',
	'hbs!tmpl/welcome'
],

function( Backbone, Communicator, TimezonesView, MatchesView, MatchesCollection, Welcome_tmpl ) {
    'use strict';

	var welcomeTmpl = Welcome_tmpl;

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
		// document.body.innerHTML = welcomeTmpl({ success: "CONGRATS!" });
		Communicator.mediator.trigger("APP:START");
	});

	return App;
});
