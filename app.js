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
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

io.on('connection', function(client) {
  io.emit('newNotification', {hello: 'world'});
  io.on('evt', function(data) {
    logger.info('io event raised with: ', data);
  });
  // client.on('event', function(data) {
  //   console.info('new data!');
  //   console.info(data);
  // });
  client.on('disconnect', function() {});
});

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
  server.listen(port);
  // app.listen(port);
  logger.info('notification-service running on port ' + port + '...');
});
