var http = require('http');
var port = process.env.port || 3003;

var connect = require('connect');

connect.createServer(
    connect.static("./public")
).listen(port);