var fs = require('fs');
//var pem = require('pem');
var http = require('http');
var https = require('https');
//var io = require('socket.io');



/*pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
  var app = express();
 
  app.get('/',  requireAuth, function(req, res){
    res.send('o hai!');
  });
 
  https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(443);
});*/

var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
/*var express = require('express');
var app = express();

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

io.listen(httpServer);
io.listen(httpsServer);

httpServer.listen(9000);
httpsServer.listen(8443);*/

var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
    //httpsServer = https.createServer(credentials, app),
	//io = require('socket.io').listen(httpsServer);
	io = require('socket.io').listen(server);
        //io = require('socket.io').listen(server);
        nickNames = [];
	
server.listen(3000);
//httpsServer.listen(8444);  
  
/*app.get('/', function(req, res) { 
	res.sendFile(__dirname + '/index.html');
	/*res.set('Content-Type', 'text/plain');
	res.status(200).send('Hello HTTP! zeynel da�l�');*/
//});

io.sockets.on('connection', function(socket) {
		console.log('io socket connceted');
        socket.on('set user', function(data){
            if(nickNames.indexOf(data.userName)!=-1) {
                console.log(data.userName+' already added');
            }else {
                console.log(data.userName+' not added');
            }
            
            /*io.sockets.emit('get users', function(data, callback){
                
            });*/
        });
    
	socket.on('send message', function(data) {
		io.sockets.emit('new message', data);
		//socket.broadcast.emit('new message', data);
		
		
		// rabbitMQ publish
	var amqp = require('amqplib/callback_api');

	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
		var q = 'pageLogRabbit';
		  var msg = '{ "UserName" : "test","Host" : "localhost:3000","Action": "test action","Controller":"Controller","Port":"3000","UserAgent":"Chrome","UserIP":"127.0.0.1","Method":"Demo","SessionID": "test session id","UserToken":"ssssss","UserPublicKey":"eeeeee","UserPrivateKey":"asaass"}';

			ch.assertQueue(q, {durable: false});
			ch.sendToQueue(q, Buffer.from(msg));
			console.log(" [x] Sent %s", msg);
		  });
		  //setTimeout(function() { conn.close(); process.exit(0) }, 500);
		});
		
		
	});
	
	
	
	
});










