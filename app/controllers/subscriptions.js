"use strict";

var util = require('util'),
    _und = require('underscore'),
    config = require('../../config'),
    async = require('async'),
    SubscriptionModel = require('../models/Subscription'),
    subscriptionFixtures = require('../../fixture/subscriptions');

exports.insertSubscription = function(req, res, next) {
    var subscription = _und.pick( req.body, Object.keys(SubscriptionModel) );
    subscription.callbackUrl = (config.ssl ? 'https' : 'http' ) + '://' + config.host + config.port + '/notify-callback'; 

    req.app.locals.mirrorClient.insertSubscription(subscription, function(err, insertedSubscription){
        if(err) return next('Error inserting subscription!');
        //req.session.message = 'Successfully inserted subscription with id';
        res.locals.message = 'Successfully inserted subscription.';
        res.locals.content = { subscriptionItem: insertedSubscription };
        next();
    });
};

exports.deleteSubscription = function(req, res, next) {
    req.app.locals.mirrorClient.deleteSubscription( req.body.id, function(err){
        if(err) return next('Error inserting subscription!');
        //req.session.message = 'Successfully deleted subscription with id ' + req.body.id;
        res.locals.message = 'Successfully deleted subscription.';
        next();
    });
};

exports.getSubscription = function(req, res, next){
    req.app.locals.mirrorClient.getSubscription( req.params.id, function(err, subscription){
        if(err) return next('Error getting subscription.');
        res.locals.content = { subscriptionItem: subscription };
    });
};

exports.getNotificationCallback = function(req, res, next) {
    if(!req.body.collection) return res.render('index', { alert: 'error', message: 'Subscription notification has no collection.'});

    if(req.body.collection === 'timeline'){

        // Patch each timeline item and proceed
        async.each( req.body.userActions, req.app.locals.mirrorClient.patchTimelineItem, next ); 

    } else if(req.body.collection === 'locations'){

        // Get location from subscription and insert timeline item with location details
        req.app.locals.mirrorClient.getLocation( req.body.itemId, function(err, location){
            req.app.locals.mirrorClient.insertTimelineItem({
                text: "Node.js QuickStart says you are at " + location.latitude + " by " + location.longitude + "."
            }, next);
        });

    } else next();
};
