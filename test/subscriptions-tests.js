"use strict";

var assert = require('assert'),
    _und = require('underscore'),
    async = require('async'),
    subscriptionssFixtures = require('./fixtures/subscriptions'),
    subscriptionsController = require('../app/controllers/subscriptions'),
    timelineController = require('../app/controllers/timeline');


describe('subscriptions', function() {
    before(function(cb) {
        cb();
    });

    beforeEach(function(cb) {
        cb();
    });

    afterEach(function(cb) {
        cb();
    });

    after(function(cb) {
        cb();
    });

    describe('#insertSubscription()', function() {
        it('inserts a subscription', function(cb) {
            var subscription = subscriptionsFixtures[0];
            subscriptionsController.insertSubscription(subscription, function(err, insertedSubscription){
                assert.ifError(err);
                assert.ok( subscription.displayName === insertedSubscription.displayName, 'inserted contact displayName matches intended text' );
                assert.ok( insertedSubscription.id, 'inserted subscription has an assigned id');
                cb();
            });
        });
    });

    describe('#listSubscriptions()', function() {
        it('returns a list of subscriptions', function(cb) {
            subscriptionsController.listSubscriptions(3, function(err, contacts){
                assert.ifError(err);
                assert.ok( !_und.isEmpty(subscriptions), 'list of contacts does not return empty');
                cb();
            });
        });
    });

    describe('#deleteSubscription()', function() {
        it('deletes a subscription', function(cb) {
            var subscription = subscriptionsFixtures[0];
            subscriptionsController.insertSubscription(contact, function(err, insertedSubscription){
                assert.ifError(err);
                subscriptionsController.deleteSubscription(insertedSubscription.id, function(err, res){
                    assert.ifError(err);
                    subscriptionsController.getSubscription(insertedSubscription.id, function(err, res){
                        assert.ifError(err);
                        assert.ok( _und.isEmpty(res), 'subscription cannot be retrieved after it has been deleted' );
                        cb();
                    });
                });
            });
        });
    });

    describe('#getNotificationCallback()', function() {
        it('calls back to notifications endpoint after subscribing', function(cb) {

            cb();
        });
    });

});
