define([
	'backbone',
	'communicator',
	'views/groups',
	'hbs!tmpl/groups'
],
function( Backbone, Communicator, GroupsView, groupsTemplate) {
    'use strict';

	var MatchesView = Backbone.Marionette.CompositeView.extend({
		itemView: GroupsView,
		template: groupsTemplate,

		initialize: function(){
			this.collection.fetch();
		}
	});

	return MatchesView;
});




