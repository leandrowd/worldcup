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
			Communicator.command.execute('setDisplayMode', e.target.value);
		}
	});

	return DisplayMode;
});




