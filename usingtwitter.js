
var request = require('request');
var url = require('url');
var username = 'madmaxlax';
var options = {
    protocol: 'https:',
    host: 'api.twitter.com',
    pathname: '/1.1/statuses/user_timeline.json',
    query: { screen_name: username, count: 10 },
    headers: {
        "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAHwHzAAAAAAAeOx7g9Cv%2F6SUjfNyOT7ik8xhSGs%3DCEyk6xzD2naEVK3eX2yZKOJJ3Gkc0U9XzpIWXtMA6YUpZe3n41",
        "Accept-Encoding": "gzip"
    },
};
console.log('processing twitter request');
var twitterUrl = url.format(options);
request(twitterUrl,options,function(err,res,body){
    console.log(err,res, body);
});
