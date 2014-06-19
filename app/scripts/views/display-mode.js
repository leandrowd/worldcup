define([
	'backbone',
	'communicator',
	'hbs!tmpl/display-mode',
	'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button'

],
function( Backbone, Communicator, template ) {
    'use strict';

	var DisplayMode = Backbone.Marionette.ItemView.extend({
		template: template,

		initialize: function(){
			this.$('.btn').button()
		},

		events: {
			'change': 'onChange'
		},

		onChange: function(e){
			console.log('onChange', e.target.value)
			Communicator.command.execute('setDisplayMode', e.target.value);
			// Communicator.mediator.trigger('timezone:change', e.target.value);
		}
	});

	return DisplayMode;
});




