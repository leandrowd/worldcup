define([
	'backbone',
	'communicator',
	'models/config',
	'views/timezone-selector',
	'views/display-mode',
	'views/matches',
	'views/teams',
	'collections/matches',
	'collections/teams'
],

function( Backbone, Communicator, configModel, TimezonesView, DisplayModeView, MatchesView, TeamsView, MatchesCollection, TeamsCollection ) {
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

			App.timezones.show(new TimezonesView);

			App.displayMode.show(new DisplayModeView({
				selected: configModel.get('displayMode')
			}));
		},

		ranking: function(){
			var App = require('application');

			App.matches.show(new TeamsView({
				collection: new TeamsCollection
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
			'table/:state': 'index',
			'ranking' : 'ranking'
		}
	});

	return Router;
});
