"use strict";

var util = require('util'),
    _und = require('underscore'),
    async = require('async'),
    SubscriptionModel = require('../models/Subscription'),
    subscriptionFixtures = require('../../fixture/subscriptions');

exports.insertSubscription = function(req, res, next) {
    //var subscription = _und.sample( subscriptionFixtures );
    var subscription = _und.pick( req.body, SubscriptionModel );
    req.app.locals.mirrorClient.insertSubscription(subscription, function(err, insertedSubscription){
        if(err) return res.render('index', { alert: 'error', message: 'Error inserting subscription!' });
        res.render('index', { message: 'Successfully inserted subscription with id ' + insertedSubscription.id });
    });
};

exports.deleteSubscription = function(req, res, next) {
    req.app.locals.mirrorClient.deleteSubscription( req.body.id, function(err){
        if(err) return res.render('index', { alert: 'error', message: 'Error deleting subscription!' });
        res.render('index', { message: 'Successfully deleted subscription with id ' + req.body.id });
    });
};

exports.getNotificationCallback = function(req, res, next) {
    if(!req.body.collection) return res.render('index');

    if(req.body.collection === 'timeline'){
        async.each( req.body.userActions, req.app.locals.mirrorClient.patchTimelineItem, next ); 
    } else if(req.body.collection === 'locations'){
        req.app.locals.mirrorClient.getLocation( req.body.itemId, function(err, location){
            req.app.locals.mirrorClient.insertTimelineItem({
                text: "Node.js QuickStart says you are at " + location.latitude + " by " + location.longitude + "."
            }, next);
        });
    } else next();
    //return res.redirect('/');
};
