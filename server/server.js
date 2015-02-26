// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dabears');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../public'));

  
var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// Middleware to use for all requests
router.use(function(req, res, next) {
    console.log(req);
    next(); // Make sure we go to the next routes and don't stop here
});

// MODEL ROUTES
// =============================================================================
var bearRouter = require('./routes/bears');

// REGISTER ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/api/bears/', bearRouter);
app.use('/', function(req, res) {
  res.sendFile(__dirname + '/../public/index.html');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Your server is ready for you on port: ' + port);
