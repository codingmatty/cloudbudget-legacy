//var http = require('http');
//var port = process.env.port || 3030;
//
//var connect = require('connect');
//
//connect.createServer(
//    connect.static("./public")
//).listen(port);

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.get('/*', function(req, res) {
  res.sendfile('./public/index.html');
});

module.exports = app;