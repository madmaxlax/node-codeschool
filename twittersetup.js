var request = require('request');
// require('global-tunnel').initialize({
//   host: 'proxy-eu.shell.com',
//   port: 8080,
//   tunnel: 'both'
// });
var key = 'byonmgh97tRtffw9STWNNp8TX';
var secret = 'ogrc07x2PglxksKC5AjRZmCGoDgQ1Wfp4FczTetqwkN0TTo8Cj';
console.log('running twitter setup');
var basicAuth = new Buffer(key + ":" + secret).toString('base64');
var options = {
    uri: "https://api.twitter.com/oauth2/token",
    method: 'POST',
    headers: {
        "Authorization": "Basic " + basicAuth,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: "grant_type=client_credentials"
};

request.post(options, function (error, response, body) {
    console.log(error, response, body);
});