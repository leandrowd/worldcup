define([
	'backbone',
	'communicator'

],
function( Backbone, Communicator ) {
    'use strict';

	var ConfigModel = Backbone.Model.extend({
		defaults: {
			// can be any place, more details in moment-timezone.json
			timezone: 'UTC',

			 // can be group, date or team
			displayMode: 'group'
		},

		initialize: function(){
			this.on('change:timezone', function(model, timezone){
				Communicator.mediator.trigger('timezone:change', timezone);
			})

			this.on('change:displayMode', function(model, displayMode){
				Communicator.mediator.trigger('displayMode:change', displayMode);
			})
		}
	});

	return new ConfigModel;
});




