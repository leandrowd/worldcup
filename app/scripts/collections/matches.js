define([
	'backbone',
	'communicator',
	'underscore',
	'moment-timezone',
	'models/config'
],
function( Backbone, Communicator, _, moment, configModel ) {
    'use strict';

	var MatchesCollection = Backbone.Collection.extend({
		url: '/api/matches',

		parse: function(response){
			var self = this;
			var displayMode = configModel.get('displayMode');

			if(this['_parseBy'+ displayMode]){

				//sort matches by date;
				var sortedGroups = [];
				var groups = this['_parseBy'+ displayMode](response.data.group);

				_.each(_.toArray(groups), function(item){
					var sorted = item.sort(function(a, b){
						return a.d_MatchDayDate > b.d_MatchDayDate;
					})
					sortedGroups.push(sorted);
				})

				return sortedGroups;

			}else{
				return response.data.group;
			}
		},

		_parseBygroup: function(list){
			var groups =  _.groupBy(list, function(item){
				return item['c_Phase_en'];
			});

			return groups;
		},

		_parseByteam: function(list){
			//making a list for hometeam and other for awayteam
			var groups = _.groupBy(list, 'c_HomeTeam_en');
			var team = _.groupBy(list, 'c_AwayTeam_en');

			//merging both lists
			_.each(groups, function(val, key){
				if(team[key]){
					_.each(team[key], function(item){
						groups[key].push(item)
					})
				}
			})

			return groups;
		},

		_parseBydate: function(list){
			var timezone = configModel.get('timezone');
			var groups = _.groupBy(list, function(item){
				return moment(item['c_MatchDayDate']).tz(timezone).format('DMM');
			});

			return groups;
		}
	});

	return MatchesCollection;
});




