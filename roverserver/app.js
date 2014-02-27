
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
bscript.pinMode('P9_14', bscript.OUTPUT); // right motor backward
bscript.pinMode('P9_16', bscript.OUTPUT); // right motor forward
bscript.pinMode('P9_21', bscript.OUTPUT); // left motor backward 
bscript.pinMode('P9_22', bscript.OUTPUT); // left motor forward
bscript.analogWrite('P8_13', 0.01 , 60);

// all environments
app.set('port', process.env.PORT || 9000);
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
     bscript.analogWrite('P9_16', 1.0 , 2000);
     bscript.analogWrite('P9_22', 1.0 , 2000);
  res.send('Moving forward now');
});

app.get('/back', function (req, res) {
     bscript.analogWrite('P9_14', 1.0 , 2000);
     bscript.analogWrite('P9_21', 1.0 , 2000);
  res.send('Moving backward now');
});

app.get('/left', function (req, res) {
     bscript.analogWrite('P9_16', 1.0 , 2000);
     bscript.analogWrite('P9_21', 1.0 , 2000);
  res.send('Moving left now');
});

app.get('/right', function (req, res) {
     bscript.analogWrite('P9_14', 1.0 , 2000);
     bscript.analogWrite('P9_22', 1.0 , 2000);
  res.send('Moving right now');
});

app.get('/stop', function (req, res) {
     bscript.analogWrite('P9_14', 0.0 , 2000);
     bscript.analogWrite('P9_16', 0.0 , 2000);
     bscript.analogWrite('P9_21', 0.0 , 2000);
     bscript.analogWrite('P9_22', 0.0 , 2000);
     res.send('stopping now');
});

app.get('/angle/:value', function (req, res) {
  if ((req.params.value > 0.01) && ( req.params.value < 0.081 ))
  {
    bscript.analogWrite('P8_13', req.params.value , 60);
   }
   res.send('setting angle');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
