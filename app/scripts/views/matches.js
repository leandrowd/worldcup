define([
	'backbone',
	'communicator',
	'views/groups-table',
	'hbs!tmpl/groups'
],
function( Backbone, Communicator, GroupsView, groupsTemplate) {
    'use strict';

	var MatchesView = Backbone.Marionette.CompositeView.extend({
		itemView: GroupsView,
		template: groupsTemplate,

		initialize: function(){
			this.collection.fetch();
			Communicator.mediator.once('displayMode:change', this.changeDisplayMode, this);
		},

		changeDisplayMode: function(){
			this.collection.fetch();
		}
	});

	return MatchesView;
});




