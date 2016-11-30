'use strict';
require('dotenv').config({silent: true});

var w = require('winston');
var logger = new (w.Logger)({
   transports: [
     new (w.transports.Console)(),
     new (w.transports.File)({ filename: 'somefile.log' })
   ]
});

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname
};

SwaggerExpress.create(config, function(err, swag) {
  if (err) { throw err; }

  swag.register(app);

  var port = process.env.SERVICE_PORT;
  app.listen(port);
  logger.info("notification-service running on port " + port + "...")
});
