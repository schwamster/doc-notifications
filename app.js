'use strict';
require('dotenv').config({silent: true});

const
    app = require('express')(),
    log = require('winston'),
    SwaggerExpress = require('swagger-express-mw'),
    DocstackRethink = require('rethinkdb-node-middleware'),
    SubscriptionService = require('./api/lib/subscriptionService');

log.level = process.env.LOG_LEVEL || 'error';
let dbConfig = {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        };
let db = new DocstackRethink(dbConfig);
db.DB = 'pubsub';
db.TABLE = {
    SUBSCRIPTIONS: 'subscriptions'
};
db.initDatabase(db.DB).then(() => {
    db.initTable(db.TABLE.SUBSCRIPTIONS, db.DB);
});

module.exports = app;
const subscriptionService = new SubscriptionService(db);

app.use((req, res, next) => {
    req.subscriptionService = subscriptionService;
    req.log = log;
    next();
});

let config = {
  appRoot: __dirname
};

SwaggerExpress.create(config, function(err, swag) {
  if (err) {
    throw err;
  }

  swag.register(app);

  const port = process.env.PORT || 80;
  app.listen(port);
  log.info('notification-service running on port ' + port + '...');
});
