var restify = require('restify');

var ip_addr = '127.0.0.1';
var port = 9090 ;

var server = restify.createServer({
name : "beaglerover"
});

server.listen(port, ip_addr, function(){
		console.log('%s listening at %s ', server.name, server.url);
});


