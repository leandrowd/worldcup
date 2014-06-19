define([
	'backbone',
	'communicator',
	'router'
],

function( Backbone, Communicator, Router ) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		matches: '.matches',
		second: '.second',
		timezones: '.timezone-selector',
		displayMode: '.display-mode'
	});

	// console.log(App)

	// Communicator.command.setHandler('setTimezone', function(timezone){
	// 	configModel.set('timezone', timezone);
	// })

	// Communicator.command.setHandler('setDisplayMode', function(displayMode){
	// 	configModel.set('displayMode', displayMode);
	// })

	// App.matches.show(new MatchesView({
	// 	collection: new MatchesCollection
	// }));

	// App.timezones.show(new TimezonesView);
	// App.displayMode.show(new DisplayModeView);

	// var _router = new Backbone.Marionette.AppRouter.extend({});
	//



	/* Add initializers here */
	App.addInitializer( function () {
		Communicator.mediator.trigger("APP:START");

		new Router();
		Backbone.history.start()
	});

	return App;
});
