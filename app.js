'use strict';
require('dotenv').config({silent: true});

let w = require('winston');
let logger = new (w.Logger)({
  transports: [
    new (w.transports.Console)(),
    new (w.transports.File)({filename: 'somefile.log'})
  ]
});

let SwaggerExpress = require('swagger-express-mw');
let app = require('express')();
module.exports = app;

let config = {
  appRoot: __dirname
};

SwaggerExpress.create(config, function(err, swag) {
  if (err) {
    throw err;
  }

  swag.register(app);

  let port = process.env.SERVICE_PORT;
  app.listen(port);
  logger.info('notification-service running on port ' + port + '...');
});
