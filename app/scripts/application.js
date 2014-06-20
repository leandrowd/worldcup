define([
	'backbone',
	'communicator',
	'router',
	'models/config'
],

function( Backbone, Communicator, Router, configModel ) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		content: '.content',
		timezones: '.timezone-selector',
		displayMode: '.display-mode'
	});

	/* Add initializers here */
	App.addInitializer( function () {
		Communicator.mediator.trigger("APP:START");

		new Router();
		Backbone.history.start({pushState: true})
	});

	return App;
});
