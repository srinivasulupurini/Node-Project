  var express = require('express'),
	app = module.exports = express(),
	handlers = require('./handlers'),
	routes = require('./routes');
  
//download files
routes(app,handlers)
app.listen(7000);

