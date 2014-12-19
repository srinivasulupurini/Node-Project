// http://expressjs.com/api.html#res.download
var express = require('express')
  , app = module.exports = express();
 
app.get('/', function(req, res){
  res.send('<ul>'
    + '<li>Download <a href="/Jellyfish.jpg">amazing.txt</a>.</li>'
    + '</ul>');
});

// /files/* is accessed via req.params[0]
// but here we name it :file
app.get('/:file(*)', function(req, res, next){
  var file = req.params.file
    , path = __dirname + '/files/' + file;

  res.download(path);
});

// error handling middleware. Because it's
// below our routes, you will be able to
// "intercept" errors, otherwise Connect
// will respond with 500 "Internal Server Error".
app.use(function(err, req, res, next){
  // special-case 404s,
  // remember you could
  // render a 404 template here
  if (404 == err.status) {
    res.statusCode = 404;
    res.send('Cant find that file, sorry!');
  } else {
    next(err);
  }
});

if (!module.parent) {
  app.listen(8000);
  console.log('Express started on port %d', 8000);
}