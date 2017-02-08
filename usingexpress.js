var express = require('express');
var app = express();

require('global-tunnel').initialize({
    host: 'proxy-eu.shell.com',
    port: 8080,
    tunnel: 'both'
});

app.get('/', //known as root route
    function (request, response) {
        response.sendFile(__dirname + '/index.html');
    });
app.listen(8080);
console.log('listening');
var request = require('request');
var url = require('url');
app.get('/tweets/:username', function (req, response) {
    var username = req.params.username;
    options = {
        protocol: 'https:',
        host: 'api.twitter.com',
        pathname: '/1.1/statuses/user_timeline.json',
        query: { screen_name: username, count: 10 },
        headers: {
            "Authorization": "Bearer " + 'AAAAAAAAAAAAAAAAAAAAAHwHzAAAAAAAeOx7g9Cv%2F6SUjfNyOT7ik8xhSGs%3DCEyk6xzD2naEVK3eX2yZKOJJ3Gkc0U9XzpIWXtMA6YUpZe3n41',
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
    };
    console.log('processing twitter request');
    var twitterUrl = url.format(options);
    request(twitterUrl).pipe(response);
});