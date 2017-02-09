var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function (client) {
    console.log('client connected..');
    client.emit("messages", { hello: 'connected!' });

    client.on('messages', function (data) {
        console.log(data);
//        client.emit("messages", { hello: 'received ' + data });
        var nickname = client.nickname;
        client.emit("messages", { hello: nickname+': ' + data });
        client.broadcast.emit("messages", { hello: 'nickname: ' + data });
        
    });
    client.on('join', function(name){
        client.nickname = name;
        console.log(name+ " joined");

        client.emit("messages", { hello: 'new user ' + name + ' joined' });        
        client.broadcast.emit("messages", { hello: 'new user ' + name + ' joined' });        
    });
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/socketio.html');
});
server.listen(8080);
console.log("listening...");