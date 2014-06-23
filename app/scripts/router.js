define([
	'backbone',
	'communicator',
	'views/timezone-selector',
	'views/display-mode',
	'views/matches',
	'views/teams',
	'collections/matches',
	'collections/teams',
	'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition',
	'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse'
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

			$('.menu-table').addClass('active');

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
			$('.menu-ranking').addClass('active');

			App.content.show(new TeamsView({
				collection: new TeamsCollection
			}));
		}
	});

    var Router = Backbone.Marionette.AppRouter.extend({
		controller: new Controller,

		initialize: function(){
			//proxy all links inside the app
			$(document).on("a", "click", function(evt) {
				// Get the anchor href and protcol
				var href = $(this).attr("href");
				var protocol = this.protocol + "//";

				// Ensure the protocol is not part of URL, meaning its relative.
				// Stop the event bubbling to ensure the link will not cause a page refresh.
				if (href.slice(protocol.length) !== protocol) {
					evt.preventDefault();

					// Note by using Backbone.history.navigate, router events will not be
					// triggered.  If this is a problem, change this to navigate on your
					// router.
					Backbone.history.navigate(href, true);
				}
			});
		},

		onRoute: function(){
			$('.menu-item').removeClass('active');
		},

		appRoutes: {
			'': 'index',
			'table/:state': 'table',
			'ranking' : 'ranking'
		}
	});

	return Router;
});
