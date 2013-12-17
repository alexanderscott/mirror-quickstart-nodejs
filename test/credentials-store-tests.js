"use strict";

var assert = require('assert'),
    async = require('async'),
    crypto = require('crypto'),
    mirrorClient = require('../lib/MirrorClient'),
    CredentialsStore = require('../lib/CredentialsStore'),
    timelineFixtures = require('./fixtures/timelineItems'),
    _und = require('underscore'),
    timelineController = require('../app/controllers/TimelineController');

var insertedUsers = [];

describe('CredentialsStore', function() {
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
        var credentialsStore = new CredentialsStore();

        // Cleanup all the random userIds we inserted, testing the delete method
        async.each(insertedUsers, credentialsStore.deleteStoredCredentials, function(err, res){
            assert.ifError(err); 
            cb();
        });
    });

    describe('#new()', function(){
        it('can create a new instance of the credentials store', function(cb){
            try {
                var credentialsStore = new CredentialsStore();
            } catch(err){
                return cb(err);
            }
            cb();
        });
    });
    describe('#storeCredentials()', function(){
        it('can store credentials', function(cb){
            var credentialsStore = new CredentialsStore();
            
            // Generate a random userId and credentials hash to test insert
            var userId = crypto.randomBytes(10).toString('hex');
            var creds = {
                access_token: crypto.randomBytes(20).toString('hex'),
                refresh_token: crypto.randomBytes(20).toString('hex')
            };

            // Push to global array for later cleanup
            insertedUsers.push(userId);

            credentialsStore.storeCredentials(userId, creds, function(err, res){
                assert.ifError(err);
                credentialsStore.getStoredCredentials(userId, function(err, res){
                    assert.ifError(err);
                    assert.ok( !_und.isEmpty(res), 'found the stored credentials we inserted');
                    assert.ok( res === JSON.stringify(creds), 'the credentials hash we found matches what we inserted');
                    cb();
            });
        });
    });

    describe('#listStoredUserIds()', function(){
        it('can list stored userIds', function(cb){
            var credentialsStore = new CredentialsStore();
            credentialsStore.listStoredUserIds(function(err, res){
                assert.ifError(err);
                assert.ok( !_und.isEmpty(res), 'found some user ids');
                cb();
            });
        });
    });
});

