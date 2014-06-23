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

		onRender: function (){
			var selectedTimezone = Communicator.reqres.request('getTimezone');
			var tzs = JSON.parse(timezones).links;

			tzs[selectedTimezone] = {
				name: tzs[selectedTimezone],
				selected: true
			}

			this.$el.html(this.template(tzs));
		},

		onChange: function(e){
			Communicator.command.execute('setTimezone', e.target.value);
		}
	});

	return MatchesView;
});




