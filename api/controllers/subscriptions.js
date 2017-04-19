'use strict';

module.exports = {
  addSubscription: addSubscription,
  getSubscriptionsByTopic: getSubscriptionsByTopic
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

function getSubscriptionsByTopic(req, res) {
    req.subscriptionService.getSubscriptionsByTopic(req.swagger.params.topic.value)
    .then((result) => {
        req.log.debug('success', res.length);
        res.status(200).send(result);
    })
    .catch((err) => {
        req.log.error(err);
        res.send('oops.');
    });
}
