"use strict";

var util = require('util'),
    _und = require('underscore'),
    cardHelper = require('../helpers/CardHelper'),
    async = require('async'),
    SubscriptionModel = require('../models/Subscription');


exports.listSubscriptions = function(req, res, next){
    req.app.locals.mirrorClient.listSubscriptions( function(err, subscriptions){
        if(err) return next("Error getting subscription list.");
        res.locals.subscriptions = subscriptions;
        res.locals.content = { subscriptionNew: true };
        next();
    });
};

exports.insertSubscription = function(req, res, next) {
    var subscription = _und.pick( req.body, Object.keys(SubscriptionModel) );
    subscription.callbackUrl = '/notify-callback'; 

    req.app.locals.mirrorClient.insertSubscription(subscription, function(err, insertedSubscription){
        if(err) return next('Error inserting subscription!');
        req.session.message = 'Successfully inserted subscription.';
        res.redirect('/subscriptions/subscription/'+insertedSubscription.id);
    });
};

exports.deleteSubscription = function(req, res, next) {
    req.app.locals.mirrorClient.deleteSubscription( req.body.id, function(err){
        if(err) return next('Error inserting subscription!');
        //req.session.message = 'Successfully deleted subscription with id ' + req.body.id;
        req.session.message = 'Successfully deleted subscription.';
        res.redirect('/');
    });
};

exports.updateSubscription = function(req, res, next){
    var subscription = _und.pick( req.body, Object.keys(SubscriptionModel) );
    req.app.locals.mirrorClient.updateSubscription( subscription, function(err, subscription){
        if(err) return next('Error updating subscription.');
        req.session.message = 'Successfully updated subscription.';
        res.redirect('/subscriptions/subscription/' + subscription.id);
    });
};

exports.getSubscription = function(req, res, next){
    req.app.locals.mirrorClient.getSubscription( req.params.id, function(err, subscription){
        if(err) return next('Error getting subscription.');
        res.locals.content = { subscriptionUpdate: subscription };
        next();
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
