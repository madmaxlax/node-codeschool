var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function (client) {
    console.log('client connected..');
    client.emit("messages", { hello: 'connected!' });

    client.on('messages', function (data) {
        console.log(data);
        client.emit("messages", { hello: 'received ' + data });

    });
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/socketio.html');
});
server.listen(8080);
console.log("listening...");