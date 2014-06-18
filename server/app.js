'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');

var app = express();

app.configure(function(){
    app.set('port', 9000);

    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '../app/scripts/views');
});

// simple log
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

// mount static
app.use(express.static( path.join( __dirname, '../app') ));
app.use(express.static( path.join( __dirname, '../.tmp') ));


// route index.html
app.get('/', function(req, res){
  res.sendfile( path.join( __dirname, '../app/index.html' ) );
});

app.get('/api/matches', function(req, res){
	req.pipe(request('http://live.mobileapp.fifa.com/api/wc/matches')).pipe(res);
});

// start server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express App started!');
});



