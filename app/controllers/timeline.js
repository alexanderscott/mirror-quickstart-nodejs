"use strict";

var util = require('util'),
    _und = require('underscore'),
    config = require('../../config'),
    TimelineItemModel = require('../models/TimelineItem');

exports.insertItem = function(req, res, next) {
    var item = _und.pick( req.body, Object.keys(TimelineItemModel) );
    req.app.locals.mirrorClient.insertTimelineItem(item, function(err, insertedItem){
        if(err) return next('Error inserting timeline item.');
        res.locals.message = 'Successfully inserted into timeline!';
        res.locals.content = { timelineItem: insertedItem };
        next();
    });
};

exports.listItems = function(req, res, next){
    req.app.locals.mirrorClient.listTimelineItems(10, function(err, timeline){
        if(err) return next('Error fetching timeline items.');
        
        // Store timelineItems in the session so we don't always need to refetch
        req.session.timelineItems = timeline.items;
        next();
    }); 
};

exports.getItem = function(req, res, next){
    req.app.locals.mirrorClient.getTimelineItem( req.params.id, function(err, timelineItem){
        if(err) return next("Error fetching timeline item with id " + req.params.id);
        res.locals.content = { timelineItem: timelineItem };
        next();
    });
};

exports.deleteItem = function(req, res, next) {
    req.app.locals.mirrorClient.deleteTimelineItem( req.body.id, function(err){
        if(err) return next('Error deleting timeline item.');
        res.locals.message = 'Successfully deleted timeline item.';
        next();
    });
};

exports.insertAllUsers = function(req, res, next) {
    res.render('index');
};

exports.insertPrettyItem = function(req, res, next) {
    var item = _und.pick( req.body, Object.keys(TimelineItemModel) );
    req.app.locals.mirrorClient.insertTimelineItem(item, function(err, insertedItem){
        if(err) return next('Error inserting timeline item.');
        res.locals.message = 'Successfully inserted into timeline!';
        res.locals.content = { timelineItem: insertedItem };
        next();
    });
};

exports.insertItemWithAction = function(req, res, next) {
    var item = _und.pick( req.body, TimelineItemModel );
    req.app.locals.mirrorClient.insertTimelineItem(item, function(err, insertedItem){
        if(err) return next('Error inserting timeline item.');
        res.locals.message = 'Successfully inserted into timeline!';
        res.locals.content = { timelineItem: insertedItem };
        next();
    });
};

exports.getAttachmentProxy = function(req, res, next) {
    req.app.locals.mirrorClient.getTimelineAttachment( req.query.timelineId, req.query.attachmentId, function(err, attachment){ 
        if(err) return res.render('index', { alert: 'error', message: "Error getting attachment proxy!" });
        //req.app.locals.mirrorClient.download( attachment.content_url, next );
        //res.attachment( attachment.content_url );
        res.download( attachment.content_url );
        res.type( attachment.contentType );
    });
};
