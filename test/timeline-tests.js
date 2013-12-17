"use strict";

var assert = require('assert'),
    timelineFixtures = require('./fixtures/timelineItems'),
    _und = require('underscore'),
    async = require('async'),
    timelineItemModel = require('../app/models/TimelineItem'),
    timelineController = require('../app/controllers/TimelineController');

var insertedTimelineItemIds = [];

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
        // Clean up all of the test timeline items we inserted
        async.each(insertedTimelineItemIds, timelineController.deleteItem, function(err, res){
            assert.ifError(err);
            cb();
        });
    });

    describe('#insertTimelineItem()', function() {
        it('inserts a timeline item', function(cb) {
            var timelineItem = timelineFixtures[0];
            
            timelineController.insertItem(timelineItem, function(err, insertedTimelineItem){
                assert.ifError(err);
                assert.ok( timelineItem.text === insertedTimelineItem.text, 'inserted timeline text matches intended text' );
                assert.ok( insertedTimelineItem.id, 'inserted timeline item has an assigned id');

                insertedTimelineItemIds.push(insertedTimelineItem.id);
                cb();
            });
        });
    });

    describe('#getTimelineItem()', function() {
        it('gets a timeline item', function(cb) {
            var timelineItem = timelineFixtures[0];

            timelineController.insertItem(timelineItem, function(err, insertedTimelineItem){
                assert.ifError(err);
                timelineController.getItem(insertedTimelineItem.id, function(err, fetchedTimelineItem){
                    assert.ifError(err);
                    assert.ok( !_und.isEmpty(fetchedTimelineItem), 'a non-empty object has been fetched');
                    assert.ok( _und.isEqual( insertedTimelineItem, fetchedTimelineItem ), 'fetched timeline item matches inserted timeline item');
                    insertedTimelineItemIds.push(insertedTimelineItem.id);
                    cb();
                });
            });
        });
    });

    describe('#patchTimelineItem()', function() {
        it('patches a timeline item', function(cb) {
            var timelineItem = timelineFixtures[0];

            timelineController.insertItem(timelineItem, function(err, insertedTimelineItem){
                assert.ifError(err);
                insertedTimelineItem.text = 'Patched timeline item';
                timelineController.patchItem(insertedTimelineItem.id, function(err, patchedTimelineItem){
                    assert.ifError(err);
                    assert.ok( !_und.isEmpty(patchedTimelineItem), 'a non-empty object has been fetched');
                    assert.ok( _und.isEqual( patchedTimelineItem, 'Patched timeline item' ), 'timeline item text has been patched');
                    insertedTimelineItemIds.push(patchedTimelineItem.id);
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
                    });
                });
            });
        });
    });

    describe('#getAttachmentProxy()', function() {
        it('can get an attachment proxy', function(cb) {

            cb();
        });
    });

});
