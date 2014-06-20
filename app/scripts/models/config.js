define([
	'backbone',
	'communicator',
	'backbone.localStorage'
],
function( Backbone, Communicator ) {
    'use strict';

    var ConfigModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("app-config"),
		defaults: {
			// can be any place, more details in moment-timezone.json
			timezone: 'UTC',

			 // can be group, date or team
			displayMode: 'group'
		},

		initialize: function(){
			var self = this;
			this.on('change:timezone', function(model, timezone){
				Communicator.mediator.trigger('timezone:change', timezone);
			})

			this.on('change:displayMode', function(model, displayMode){
				Communicator.mediator.trigger('displayMode:change', displayMode);
			})

			//make commands available on the whole app
			Communicator.command.setHandler('setTimezone', function(timezone){
				self.set('timezone', timezone);
				self.save();
			})

			Communicator.command.setHandler('setDisplayMode', function(displayMode){
				self.set('displayMode', displayMode);
				self.save();
			})


			Communicator.reqres.setHandler('getConfig', function(timezone){
				return self.toJSON();
			})

			Communicator.reqres.setHandler('getTimezone', function(timezone){
				return self.get('timezone');
			})

			Communicator.reqres.setHandler('getDisplayMode', function(displayMode){
				return self.get('displayMode');
			})

			//update data from localStorage
			this.fetch();
		}

	});

	// it should has id 1 because we don't want
    // to create a new register every time
	return new ConfigModel({id: 1});
});




