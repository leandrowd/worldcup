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

		index: function(state){
			var App = require('application');

			var displayMode = configModel.get('displayMode');

			if (displayMode !== state) {
				configModel.set('displayMode', state);
			}

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

			App.displayMode.show(new DisplayModeView({
				selected: configModel.get('displayMode')
			}));
		}
	});

    var Router = Backbone.Marionette.AppRouter.extend({
		controller: new Controller,

		initialize: function(){
			var displayMode = configModel.get('displayMode');
			Backbone.history.navigate('table/'+ displayMode, {trigger: true});
		},

		appRoutes: {
			'': 'index',
			'table/:state': 'index'
		}
	});

	return Router;
});
