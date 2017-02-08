var hello = require('./customhello');
var bye = require('./customgoodbye');

hello();
bye.goodbye();
var makeReq = require('./makerequest.js');
var message = "looking at you";
makeRequest(message);