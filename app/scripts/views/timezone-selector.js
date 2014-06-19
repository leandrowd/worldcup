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

		events: {
			'change': 'onChange'
		},

		render: function(){
			this.$el.html(this.template(JSON.parse(timezones).links));
		},

		onChange: function(e){
			Communicator.command.execute('setTimezone', e.target.value);
			// Communicator.mediator.trigger('timezone:change', e.target.value);
		}
	});

	return MatchesView;
});




