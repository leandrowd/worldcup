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

		},

		onRender: function(){
			//select the right state
			this.$el.find('[value='+this.options.selected+']').parent('label').addClass('active');
		},

		events: {
			'change': 'onChange'
		},

		onChange: function(e){
			Communicator.command.execute('setDisplayMode', e.target.value);
			Backbone.history.navigate('table/' + e.target.value, {trigger: true});
		}
	});

	return DisplayMode;
});




