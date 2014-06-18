define([
	'backbone',
	'communicator',
	'hbs!tmpl/match'
],
function( Backbone, Communicator, macthTemplate ) {
    'use strict';

	var MatchesView = Backbone.Marionette.ItemView.extend({
		template: macthTemplate,
		tagName: 'div',
		className: 'match',

		initialize: function(){
			this.model.set('timezone', 'GMT');
			this.listenTo(Communicator.mediator, 'timezone:change', this.changeTimezone);
		},

		modelEvents: {
			'change:timezone': 'render'
		},

		changeTimezone: function(a){
			console.log(a);
			this.model.set('timezone', a);
		}
	});

	return MatchesView;
});




