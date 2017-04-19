
'use strict';
const
    // db = require('rethinkdb-node-middleware'),
    log = require('winston');


class SubscriptionService {
    constructor(db) {
        this.db = db;
    }

    addSubscription(subscription) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.db.insert(subscription, self.db.TABLE.SUBSCRIPTIONS, self.db.DB)
            .then((res) => {
                log.info('subscription added', subscription);
                resolve(res);
            })
            .catch(reject);
        });
    }
}
module.exports = SubscriptionService;
