"use strict";

exports.insertSubscription(req, res) {
    var subscription = {

    };
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
