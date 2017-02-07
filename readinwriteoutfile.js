var fs = require('fs');
var file = fs.createReadStream('index.html');
var newfile = fs.createWriteStream('index_copy.html');
file.pipe(newfile);