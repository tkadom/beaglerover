
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// initialize beagle bone
var bscript=require('bonescript');
bscript.pinMode('P8_13', bscript.OUTPUT); // Servo
bscript.pinMode('P9_14', b.OUTPUT); // left motor 
bscript.pinMode('P9_16', b.OUTPUT);
bscript.pinMode('P9_21', b.OUTPUT); // right motor 
bscript.pinMode('P9_22', b.OUTPUT);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/forward', function (req, res) {
     bscript.analogWrite('P8_13', 0.01 , 60);
  res.send('Moving Forward now');
});

app.get('/backward', function (req, res) {
     bscript.analogWrite('P8_13', 0.01 , 60);
  res.send('Moving Forward now');
});

app.get('/left', function (req, res) {
     bscript.analogWrite('P8_13', 0.01 , 60);
  res.send('Moving Forward now');
});

app.get('/right', function (req, res) {
     bscript.analogWrite('P8_13', 0.01 , 60);
  res.send('Moving Forward now');
});

app.get('/stop', function (req, res) {
	bscript.analogWrite('P8_13', 0.09 , 60);
	res.send('stopping now');
});

app.get('/angle', function (req, res) {
	bscript.analogWrite('P8_13', 0.09 , 60);
	res.send('stopping now');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
