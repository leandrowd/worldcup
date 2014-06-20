define([
	'backbone',
	'communicator',
	'views/groups-table',
	'hbs!tmpl/groups',
	'models/config'
],
function( Backbone, Communicator, GroupsView, groupsTemplate, configModel) {
    'use strict';

	var MatchesView = Backbone.Marionette.CompositeView.extend({
		itemView: GroupsView,
		template: groupsTemplate,

		initialize: function(){
			this.collection.fetch();
			this.listenTo(configModel, 'change:displayMode', this.changeDisplayMode);
		},

		changeDisplayMode: function(){
			this.collection.fetch();
		}
	});

	return MatchesView;
});




