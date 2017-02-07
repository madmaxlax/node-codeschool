var fs = require('fs');
var http = require('http');

http.createServer(function (request, response) {
  var newfile = fs.createWriteStream('upload.txt');
  console.log('received request, writing it');
  request.pipe(newfile);
  request.on('end', function(){
      response.end('upload complete');
  });
}).listen(8080);