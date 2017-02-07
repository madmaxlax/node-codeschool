var http = require('http');
var fs = require('fs');
console.log("Runing web server. Listening...");
http.createServer(function (request, response) {
    response.writeHead(200);//, { 'Content-Type': 'text/html' });
    request.pipe(response);
    ////Note, all this reading then writing back can be replaced with request.pipe(response)
    // request.on('readable', function(){
    //     console.log("Request came in " + request.url);
    //     var chunk = null;
    //     while (null !== (chunk = request.read())){
    //         console.log(chunk.toString());
    //         response.write(chunk);
    //     }
    // });
    // request.on('end', function(){
    //     response.end();
    // });
}).listen(8080);
