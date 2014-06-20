define([
	'backbone',
	'communicator',
	'hbs!tmpl/team'
],
function( Backbone, Communicator, teamTemplate) {
    'use strict';

	var MatchesView = Backbone.Marionette.ItemView.extend({
		template: teamTemplate,
		tagName: 'tr',
		initialize: function(){
			console.log(this.model.attributes);
			// this.collection = new Backbone.Collection(_.toArray(this.model.attributes));
		}

	});

	return MatchesView;
});




