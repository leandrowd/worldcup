'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');

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

// route index.html
app.get('/', function(req, res){
  res.sendfile( path.join( process.env.PWD, sourceFolder + '/index.html' ) );
});

app.get('/api/matches', function(req, res){
	req.pipe(request('http://live.mobileapp.fifa.com/api/wc/matches')).pipe(res);
});

// start server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express App started!');
    console.log('Listening port ' + app.get('port'));
    console.log('Env:' + env);
});



