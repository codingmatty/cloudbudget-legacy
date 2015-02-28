// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var path       = require('path');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cloudbudget');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;        // set our port

// MODEL ROUTES
// =============================================================================
var transactionRouter = require('./routes/transactions');

// REGISTER ROUTES -------------------------------
app.use(express.static(path.resolve(__dirname + '/../public')));
app.use(function(req, res, next) {
    console.log('Url:    ' + req.originalUrl);
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    console.log();
    next(); // Make sure we go to the next routes and don't stop here
});
app.use('/api/v1/transactions', transactionRouter);
app.use('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

// START THE SERVER
// =============================================================================

//app.listen(port); // Grunt will start this...
console.log('Your server is ready for you on port: ' + port);

module.exports = app;