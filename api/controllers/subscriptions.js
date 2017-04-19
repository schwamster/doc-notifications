'use strict';

module.exports = {
  addSubscription: addSubscription
};

function addSubscription(req, res) {
    req.subscriptionService.addSubscription(req.body)
    .then((result) => {
        req.log.debug('success', result);
        res.status(200).send({message: 'ok'});
    })
    .catch((err) => {
        req.log.error(err);
        res.send('oops.');
    });
}
