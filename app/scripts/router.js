define([
	'backbone',
	'communicator',
	'models/config',
	'views/timezone-selector',
	'views/display-mode',
	'views/matches',
	'collections/matches',
	'collections/second'
],

function( Backbone, Communicator, configModel, TimezonesView, DisplayModeView, MatchesView, MatchesCollection, SecondCollection ) {
    'use strict';

    var Controller = Backbone.Marionette.Controller.extend({

		initialize: function(){

		},

		index: function(){
			var App = require('application');

			Communicator.command.setHandler('setTimezone', function(timezone){
				configModel.set('timezone', timezone);
			})

			Communicator.command.setHandler('setDisplayMode', function(displayMode){
				configModel.set('displayMode', displayMode);
			})

			App.matches.show(new MatchesView({
				collection: new MatchesCollection
			}));

			App.second.show(new MatchesView({
				collection: new SecondCollection
			}));

			App.timezones.show(new TimezonesView);
			App.displayMode.show(new DisplayModeView);
		}
	});

    var Router = Backbone.Marionette.AppRouter.extend({
		controller: new Controller,
		initialize: function(){

		},
		appRoutes: {
			'': 'index'
		}
	});

	return Router;
});
