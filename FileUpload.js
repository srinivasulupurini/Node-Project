  var express = require('express'),
	app = module.exports = express(),
	handlers = require('./handlers'),
	routes = require('./routes'),
	https=require('https'),
	fs = require('fs');
  
  
  var options = {
  //certificate name SecureNodeFileUpload
  key: fs.readFileSync('files/0101fc93-27bf-4ae5-9f42-0ba24c5e68c9.private.pem'),
  cert: fs.readFileSync('files/0101fc93-27bf-4ae5-9f42-0ba24c5e68c9.public.pem')
};
//download files
routes(app,handlers)
https.createServer(options,app).listen(7000);