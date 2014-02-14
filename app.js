var restify = require('restify');
var motorSave = require('save')('motor');

var ip_addr = '127.0.0.1';
var port = 12345 ;

var server = restify.createServer({
name : "beaglerover"
});

server.listen(port, ip_addr, function(){
		console.log('%s listening at %s ', server.name, server.url);
});

server.get('/motor', function (req, res, next) {
	motorSave.find({}, function (Error, motors) {
		res.send(motors)
	})
})

server.post('/motor', function (req, res, next) {
  if (req.params.name === undefined) {
    return next(new restify.InvalidArgumentError('Name must be supplied'))
  }
 
  motorSave.create({ name: req.params.name }, function (error, motor) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
 
    res.send(201, motor)
  })
})
