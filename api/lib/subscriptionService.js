
'use strict';
const log = require('winston');


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

    getSubscriptionsByTopic(topic) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.db.list(self.db.TABLE.SUBSCRIPTIONS, self.db.DB, {topic: topic})
            .then((res) => {
                log.info('found subscriptions for topic', topic);
                resolve(res);
            })
            .catch(reject);
        });
    }
}
module.exports = SubscriptionService;
