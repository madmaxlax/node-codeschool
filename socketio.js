var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('redis');
var redisClient = redis.createClient();
var messages = [];
try {

    var storeMessage = function (user, data) {
        // messages.push({user: user, data: data});
        var message = JSON.stringify({ user: user, data: data });
        redisClient.lpush("messages", message, function (err, response) {
            redisClient.ltrim("messages", 0, 9);
        });
        // if (messages.length >  10){//only save 10
        //     messages.shift();
        // }
    };
    io.on('connection', function (client) {
        console.log('client connected..');
        client.emit("messages", { hello: 'connected!' });

        client.on('messages', function (data) {
            console.log(data);
            //        client.emit("messages", { hello: 'received ' + data });
            var nickname = client.nickname;
            client.emit("messages", { hello: nickname + ': ' + data });
            client.broadcast.emit("messages", { hello: 'nickname: ' + data });

            storeMessage(nickname, data);

        });
        client.on('join', function (name) {
            client.nickname = name;
            console.log(name + " joined");
            client.emit("messages", { hello: 'new user ' + name + ' joined' });
            client.broadcast.emit("messages", { hello: 'new user ' + name + ' joined' });

            redisClient.lrange("messages", 0, -1, function (err, messages) {
                messsages = messages.reverse();
                messages.forEach(function (message) {
                    message = JSON.parse(message);
                    client.emit("messages", { hello: message.user + ': ' + message.data });
                });
            });
            //note, broadcast sends message to everyone ELSE, besides current client
        });
    });
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/socketio.html');
    });
    server.listen(8080);
    console.log("listening...");

} catch (error) {
    console.log(error.message);
}