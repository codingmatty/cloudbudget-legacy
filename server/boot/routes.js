var loopback = require('loopback');
var path = require('path');
module.exports = function(app) {
  app.use(loopback.static(path.join(__dirname, '..', '..', 'client')));
  app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'index.html'));
  });
  app.use('/poop', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'index.html'));
  });
}