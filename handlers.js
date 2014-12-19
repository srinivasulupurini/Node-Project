var formidable = require('formidable'),
      fs = require('fs'),
      util = require('util');
var uploadedFiles = [];
	  
exports.home = function home(req, res){
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}

exports.upload = function upload(req,res){
var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = 'Uploads';
	form.on('file', function(field, file) {
            //rename the incoming file to the file's name
                fs.rename(file.path, form.uploadDir + "/" + file.name);
				uploadedFiles.push(file);
        })
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/html'});
    });
	form.on('end', function() {
             res.write('Uploading completed\n' );
			 res.write("<html><body><div>Uploaded Files: <ul>");
			 for(var i=0;i<uploadedFiles.length;i++){
			 res.write("<li>");
			 res.write("<div>"+uploadedFiles[i].name+"<a href="+"/"+uploadedFiles[i].name+">Download</a>");
			 res.write("</li>");
			 }
			 res.end("</ul></div></body></html>");
        });
		

    return;
}

exports.download = function download(req,res){
 var file = req.params.file
    , path = __dirname + '/Uploads/' + file;

  res.download(path);
}