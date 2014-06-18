define([
	'backbone',
	'communicator',
	'views/match',
	'hbs!tmpl/group'
],
function( Backbone, Communicator, GroupView, GroupsTemplate) {
    'use strict';

	var GroupsView = Backbone.Marionette.CompositeView.extend({
		template: GroupsTemplate,
		itemView: GroupView,
		itemViewContainer: '.items',

		initialize: function(){
			//Grid View - based on http://jsfiddle.net/derickbailey/me4NK/
			this.collection = new Backbone.Collection(_.toArray(this.model.attributes));
		},

		//overriding method to get the group name
		serializeData: function() {
			var data = {};

			if (this.model) {
				data = this.model.toJSON();
			}

			if (this.collection) {
				data = {group: this.collection.models[0].attributes['c_Phase_en']}
			}

			return data;
		}

	});

	return GroupsView;
});




