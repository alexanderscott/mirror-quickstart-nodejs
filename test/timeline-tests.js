"use strict";

var assert = require('assert'),
    timelineFixtures = require('../fixture/timelineItems'),
    _und = require('underscore'),
    timelineController = require('../app/controllers/timeline');


describe('timeline', function() {
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

    describe('#insertTimelineItem()', function() {
        it('inserts a timeline item', function(cb) {
            var timelineItem = timelineFixtures[0];
            
            timelineController.insertItem(timelineItem, function(err, insertedTimelineItem){
                assert.ifError(err);
                assert.ok( timelineItem.text === insertedTimelineItem.text, 'inserted timeline text matches intended text' );
                assert.ok( insertedTimelineItem.id, 'inserted timeline item has an assigned id');
                cb();
            });
        });
    });

    describe('#getTimelineItem()', function() {
        it('gets a timeline item', function(cb) {
            timelineController.insertItem(timelineItem, function(err, insertedTimelineItem){
                assert.ifError(err);
                timelineController.getItem(insertedTimelineItem.id, function(err, fetchedTimelineItem){
                    assert.ifError(err);
                    assert.ok( !_und.isEmpty(fetchedtimelineItem), 'a non-empty object has been fetched');
                    assert.ok( _und.isEqual( insertedTimelineItem, fetchedTimelineItem ), 'fetched timeline item matches inserted timeline item');
                    cb();
                });
            });
        });
    });

    describe('listItems()', function() {
        it('lists timeline items', function(cb) {
            timelineController.listItems(3, function(err, timelineItems){
                assert.ifError(err);
                assert.ok( !_und.isEmpty(timelineItems), 'a non-empty object has been fetched');
                cb();
            });
        });
    });

    describe('#deleteTimelineItem()', function() {
        it('deletes a timeline item', function(cb) {
            var timelineItem = timelineFixtures[0];
            
            timelineController.insertTimelineItem(timelineItem, function(err, insertedTimelineItem){
                assert.ifError(err);
                timelineController.deleteItem( insertedTimelineItem.id, function(err, res){
                    assert.ifError(err);
                    timelineController.getTimelineItem( insertedTimelineItem.id, function(err, res){
                        assert.ifError(err);
                        assert.ok( _und.isEmpty( res ), 'timeline item cannot be retrieved after it has been deleted' );   
                        cb();
                    })
                });
            });
        });
    });

    describe('#insertAllUsers()', function() {
        it('inserts all users', function(cb) {

            cb();
        });
    });

    describe('#insertPrettyItem()', function() {
        it('inserts a pretty item', function(cb) {

            cb();
        });
    });

    describe('#insertItemWithAction()', function() {
        it('inserts an item with action', function(cb) {

            cb();
        });
    });

    describe('#getAttachmentProxy()', function() {
        it('can get an attachment proxy', function(cb) {

            cb();
        });
    });

});
