define([
	'backbone',
	'communicator',
	'views/match',
	'hbs!tmpl/group',
	'models/config'
],
function( Backbone, Communicator, GroupView, GroupsTemplate, configModel) {
    'use strict';

	var GroupsView = Backbone.Marionette.CompositeView.extend({
		template: GroupsTemplate,
		itemView: GroupView,
		itemViewContainer: '.items',
		className: '',

		initialize: function(){
			this.collection = new Backbone.Collection(_.toArray(this.model.attributes), {
				comparator: 'group'
			});

		},

		//getting the group name
		serializeData: function() {
			var data = {};

			if (this.model) {
				data = this.model.toJSON();
			}

			if (this.collection) {
				var attrs = this.collection.models[0].attributes;
				switch(configModel.get('displayMode')){
					case 'team':
						data = {group: this._getTeamName(this.collection.models)};
						break;

					case 'date':
						var timezone = configModel.get('timezone');
						data = {group: moment(attrs['c_MatchDayDate']).tz(timezone).format('Do MMMM')};
						break;

					case 'group':
						data = {group: attrs['c_Phase_en']};
						break;
				}
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




