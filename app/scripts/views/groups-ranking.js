define([
	'backbone',
	'communicator',
	'views/team',
	'hbs!tmpl/ranking'
],
function( Backbone, Communicator, TeamView, rankingTemplate) {
    'use strict';

	var GroupsView = Backbone.Marionette.CompositeView.extend({
		template: rankingTemplate,
		itemView: TeamView,
		tagName: 'div',
		className: 'col-md-6',
		itemViewContainer: 'tbody',

		initialize: function(){
			this.collection = new Backbone.Collection(_.toArray(this.model.attributes));
			//sort teams inside group
			this.collection.comparator = 'n_GroupPosition';
			this.collection.sort();
		},



		//getting the group name
		serializeData: function() {
			var data = {};

			if (this.model) {
				data = this.model.toJSON();
			}

			if (this.collection) {
				_.extend(data, {group: this.collection.models[0].attributes['c_Group']});
			}

			return data;
		},
	});

	return GroupsView;
});




