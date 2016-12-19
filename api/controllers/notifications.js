'use strict';

module.exports = {
  notification: notification
};

function notification(req, res) {
  res.json({
    message: 'ok'
  });
}
