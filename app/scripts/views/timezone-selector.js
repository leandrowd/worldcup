define([
	'backbone',
	'communicator',
	'handlebars',
	'helpers/timezones',
	'hbs!tmpl/timezone-selector',
	'text!bower_components/moment-timezone/moment-timezone.json'
],
function( Backbone, Communicator, Handlebars, moment, template, timezones ) {
    'use strict';

	var MatchesView = Backbone.Marionette.ItemView.extend({
		template: template,

		initialize: function(){

		},

		events: {
			'change': 'onChange'
		},

		render: function(){
			this.$el.html(this.template(JSON.parse(timezones).links));
		},

		onChange: function(e){
			Communicator.mediator.trigger('timezone:change', e.target.value);
		}
	});

	return MatchesView;
});




