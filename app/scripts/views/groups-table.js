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
			this.collection = new Backbone.Collection(_.toArray(this.model.attributes));
		},

		//getting the group name
		serializeData: function() {
			var data = {},
				dataCollection;

			if (this.model) {
				data = this.model.toJSON();
			}

			if (this.collection) {
				var attrs = this.collection.models[0].attributes;
				var displayMode = Communicator.reqres.request('getDisplayMode');
				switch(displayMode){
					case 'team':
						dataCollection = {group: this._getTeamName(this.collection.models)};
						break;

					case 'date':
						var timezone = Communicator.reqres.request('getTimezone');
						dataCollection = {group: moment(attrs['c_Date']).tz(timezone).format('Do MMMM')};
						break;

					case 'group':
						dataCollection = {group: attrs['c_Phase_en']};
						break;
				}

				_.extend(data, dataCollection);
			}

			return data;
		},

		_getTeamName: function(models){
			var getNames = function(obj, key){
				return _.map(obj, function(value){
					return value.get(key);
				})
			};


			var homeTeams = getNames(models, 'c_HomeTeam_en'),
				visitorTeams = getNames(models, 'c_AwayTeam_en'),

				//intersection to see which team appear more than once
				teamName = _.intersection(homeTeams, visitorTeams);


			return teamName;
		}
	});

	return GroupsView;
});




