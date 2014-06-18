define([
	'backbone',
	'communicator',
	'views/match'
],
function( Backbone, Communicator, MatchView) {
    'use strict';

	var MatchesView = Backbone.Marionette.CollectionView.extend({
		itemView: MatchView,
		initialize: function(){
			this.collection.fetch();
		}
	});

	return MatchesView;
});




