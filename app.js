var fs = require('fs');
//var pem = require('pem');
var http = require('http');
var https = require('https');
//var io = require('socket.io');


log4js = require("log4js");
//log4js.configure(__dirname + "/log4js.json") 

log4js.configure({
  appenders: {
    email: {
      type: '@log4js-node/smtp',
	  //type: 'smtp',
      transport: {
        plugin: 'smtp',
        options: {
          host: 'smtp.gmail.com',
          port: 587
        }
      },
      recipients: '311corner82@gmail.com'
    }
  },
  categories: {
    default: { appenders: ['email'], level: 'info' }
  }
});
													 
/*log4js.configure({
  appenders: {
    'email': {
      type: '@log4js-node/smtp',
      recipients: '311corner82@gmail.com',
      subject: 'Latest logs',
      sender: '311corner82@gmail.com',
      attachment: {
        enable: true,
        //filename: 'latest.log',
        message: 'See the attachment for the latest logs'
      },
      sendInterval: 3600
    }
  },
  categories: { default: { appenders: ['email'], level: 'ERROR' } }
});	*/											
													 
logger = log4js.getLogger();



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
		console.log('io socket connted');
		
		socket.on('error', (err) => {
		  // If the connection is reset by the server, or if it can't
		  // connect at all, or on any sort of error encountered by
		  // the connection, the error will be sent here.
		  console.error(err);
		});
		
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
		
		try{ 
			logger.error("This send you an email!");
			conn.createChannel(function(err, ch) {
			//var q = 'pageLogRabbit';
			var q = 'pageActivityLogRabbit';
			
			  var msg = '{ "UserName" : "test","Host" : "localhost:3000","Action": "test action","Controller":"Controller","Port":"3000","UserAgent":"Chrome","UserIP":"127.0.0.1","Method":"Demo","SessionID": "test session id","UserToken":"ssssss","UserPublicKey":"eeeeee","UserPrivateKey":"asaass"}';

				ch.assertQueue(q, {durable: false});
				//ch.sendToQueue(q, Buffer.from(msg));
				ch.sendToQueue(q, Buffer.from(data));
				//console.log(" [x] Sent %s", msg);
				console.log(" [x] Sent %s", data);
			  });
			
		} catch(err) {
			logger.error("This send you an email!");
			console.log(err);
		}
		
		  
		  //setTimeout(function() { conn.close(); process.exit(0) }, 500);
		  
		});
		
		
	});
	
	
	
	
});










