var fs = require('fs');
var http = require('http');
console.log('Upload server running, ready');

http.createServer(function (request, response) {
  var newfile = fs.createWriteStream('upload.jpg');
  var fileBytes = request.headers['content-length'];
  var uploadedBytes = 0;
  
  request.on('readable',function(){
    console.log('received request, writing it');
    var chunk = null;
    while(null !== (chunk = request.read())){
        uploadedBytes += chunk.length;
        var progress = (uploadedBytes / fileBytes) * 100;
        console.log('progress: ' + parseInt(progress,10) +'%');
    }
  });
  request.pipe(newfile);

  request.on('end', function(){
      response.end('upload complete');
  });
}).listen(8080);