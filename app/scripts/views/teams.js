define([
	'backbone',
	'communicator',
	'views/groups-ranking',
	'hbs!tmpl/groups'
],
function( Backbone, Communicator, RankingView, groupTemplate) {
    'use strict';

	var MatchesView = Backbone.Marionette.CompositeView.extend({
		itemView: RankingView,
		template: groupTemplate,
		itemContainer: '.panel-body',

		initialize: function(){
			this.collection.fetch();
		}
	});

	return MatchesView;
});




