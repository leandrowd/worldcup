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

		className: function(){
			var klass = 'match';
			if (this.model.get('b_Finished') == true){
				klass += ' finished'
			}
			return klass
		},

		initialize: function(){
			this.model.set('timezone', 'GMT');
			this.listenTo(Communicator.mediator, 'timezone:change', this.changeTimezone);
		},

		modelEvents: {
			'change:timezone': 'render'
		},

		changeTimezone: function(a){
			this.model.set('timezone', a);
		}
	});

	return MatchesView;
});




