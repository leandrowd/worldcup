'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');
var JSONStream = require('JSONStream');
var _ = require('underscore');
var dateFormat = require('dateformat');

var env = process.env.NODE_ENV || 'dev';
var sourceFolder = (env == "production") ? '/public' : '/app';

process.env.PWD = process.cwd()

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 9000);
});

// simple log
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

// mount static
app.use(express.static( path.join( process.env.PWD, sourceFolder) ));
app.use(express.static( path.join( process.env.PWD, '/.tmp') ));


app.get('/api/matches', function(req, res){
	req.pipe(request('http://live.mobileapp.fifa.com/api/wc/matches').pipe(JSONStream.parse('data'))).pipe(res);
});


//TODO: refactor and organize it;
function cleanUpObj(obj){
    var neededKeys = ['c_Date', 'c_Stadium', 'c_City', 'n_HomeGoals', 'n_AwayGoals', 'b_Started', 'b_Live', 'b_Finished', 'c_Phase_en', 'c_HomeTeam_en', 'c_HomeLogoImage', 'c_AwayTeam_en', 'c_AwayLogoImage', 'c_MatchDayDate', 'd_MatchDayDate'];
    return _.pick(obj, neededKeys);
}

function prepareData(list, filter){
	var sortedGroups = [];
	var groups = filters[filter](list);

	_.each(_.toArray(groups), function(item){
		item = _.map(item, cleanUpObj);
		sortedGroups.push(_.sortBy(item, 'd_MatchDayDate'));
	})

	return sortedGroups
}

function getMatchesAndFilterBy(filter, callback) {
	request('http://live.mobileapp.fifa.com/api/wc/matches', function (error, response, body) {
	    var data = JSON.parse(response.body);
	    var list = data.data.group;

	    var groups = prepareData(data.data.group, filter);
	    var secondPhase = prepareData(data.data.second, filter);

		callback(_.union(groups, secondPhase));
    });
}

var filters = {
	group : function(list){
		return _.groupBy(list, function(item){
			return item['c_Phase_en'];
		});
	},
	team : function(list){
		//making a list for hometeam and other for awayteam
		var home = _.groupBy(list, 'c_HomeTeam_en');
		var visitor = _.groupBy(list, 'c_AwayTeam_en');

		//merging both lists
		_.each(home, function(val, key){
			if(visitor[key]){
				_.each(visitor[key], function(item){
					home[key].push(item)
				})
			}
		})

		return home;
	},

	date : function(list){
		list = _.sortBy(list, 'c_Date');
		return _.groupBy(list, function(item){
			return dateFormat(item['c_Date'], 'mmmm dS');
		});
	}
}

app.get('/api/matches/group', function(req, res){
	getMatchesAndFilterBy('group', function(data){
		res.send(data);
	});
});

app.get('/api/matches/team', function(req, res){
	getMatchesAndFilterBy('team', function(data){
		res.send(data);
	});
});

app.get('/api/matches/date', function(req, res){
	getMatchesAndFilterBy('date', function(data){
		res.send(data);
	});
});

app.get('/api/teams', function(req, res){
	req.pipe(request('http://live.mobileapp.fifa.com/api/wc/teams')).pipe(res);
});

// route index.html
app.get('*', function(req, res){
	res.sendfile( path.join( process.env.PWD, sourceFolder + '/index.html' ) );
});


// start server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express App started!');
    console.log('Listening port ' + app.get('port'));
    console.log('Env:' + env + ' | sourceFolder: ' + sourceFolder);
});



