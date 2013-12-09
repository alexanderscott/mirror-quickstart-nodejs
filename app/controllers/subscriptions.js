"use strict";

var util = require('util'),
    _und = require('underscore'),
    subscriptionFixtures = require('../../fixtures/subscriptions');

exports.insertSubscription(req, res) {
    var subscription = { };
    var subscription = _und.sample( subscriptionFixtures );
    req.app.locals.mirrorClient.insertSubscription(subscription, function(err){
        if(err) return res.error(err);
        res.json({});

    });
}

exports.deleteSubscription(req, res) {
    var subscription = {

    };
    req.app.locals.mirrorClient.deleteSubscription(subscription, function(err){
        if(err) return res.error(err);
        res.json({});

    });
}

exports.getNotificationCallback(req, res) {

    res.json({});
}
