define([
	'backbone',
	'communicator',
	'hbs!tmpl/match'
],
function( Backbone, Communicator, macthTemplate ) {
    'use strict';

	var MatchesView = Backbone.Marionette.ItemView.extend({
		template: macthTemplate,
		tagName: 'div',

		className: function(){
			var totalItems = this.model.collection.length,
				totalColumns = 12,
				totalSpotsLarge = 6,
				totalSpotsMedium = 3,
				sizeLarge,
				sizeMedium;

			function getSize(totalColumns, totalSpots, totalItems){
				var size;
				if(totalItems == 1) {
					size = totalColumns;

				} else if (totalItems == 3) {
					size = totalColumns / 3;

				} else if (totalItems == totalSpots) {
					size = totalColumns / totalSpots;

				} else {
					size = totalColumns / (totalItems / 2);

				}

				return size;
			}

			sizeLarge = getSize(totalColumns, totalSpotsLarge, totalItems);
			sizeMedium = getSize(totalColumns, totalSpotsMedium, totalItems);


			var klass = 'match col-xs-12 col-sm-' + sizeMedium + ' col-md-' + sizeLarge;
			if (this.model.get('b_Finished') == true){
				klass += ' bg-success'
			}
			return klass
		},

		initialize: function(){
			this.model.set('timezone', 'GMT');
			this.listenTo(Communicator.mediator, 'timezone:change', this.changeTimezone);
		},

		modelEvents: {
			'change:timezone': 'render'
		},

		changeTimezone: function(a){
			this.model.set('timezone', a);
		}
	});

	return MatchesView;
});




