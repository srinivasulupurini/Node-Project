  var express = require('express'),
	app = module.exports = express(),
	handlers = require('./handlers'),
	routes = require('./routes'),
	https=require('https'),
	cluster = require('cluster');
	fs = require('fs');
  
  var numCPUs = require('os').cpus().length;
  
  var options = {
  //certificate name SecureNodeFileUpload
  key: fs.readFileSync('files/0101fc93-27bf-4ae5-9f42-0ba24c5e68c9.private.pem'),
  cert: fs.readFileSync('files/0101fc93-27bf-4ae5-9f42-0ba24c5e68c9.public.pem')
};
//download files
routes(app,handlers)
if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
https.createServer(options,app).listen(7000);
}