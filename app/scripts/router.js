define([
	'backbone',
	'communicator',
	'views/timezone-selector',
	'views/display-mode',
	'views/matches',
	'views/teams',
	'collections/matches',
	'collections/teams'
],

function( Backbone, Communicator, TimezonesView, DisplayModeView, MatchesView, TeamsView, MatchesCollection, TeamsCollection ) {
    'use strict';

    var Controller = Backbone.Marionette.Controller.extend({

		initialize: function(){

		},

		index: function(){
			var displayMode = Communicator.reqres.request('getDisplayMode');
			Backbone.history.navigate('table/'+ displayMode, {trigger: true});
		},

		table: function(state){
			var App = require('application');
			var displayMode = Communicator.reqres.request('getDisplayMode');

			if (state && displayMode !== state) {
				Communicator.command.execute('setDisplayMode', state);
			}

			App.content.show(new MatchesView({
				collection: new MatchesCollection
			}));

			App.timezones.show(new TimezonesView);

			App.displayMode.show(new DisplayModeView({
				selected: displayMode
			}));
		},

		ranking: function(){
			var App = require('application');

			App.content.show(new TeamsView({
				collection: new TeamsCollection
			}));
		}
	});

    var Router = Backbone.Marionette.AppRouter.extend({
		controller: new Controller,

		appRoutes: {
			'': 'index',
			'table/:state': 'table',
			'ranking' : 'ranking'
		}
	});

	return Router;
});
