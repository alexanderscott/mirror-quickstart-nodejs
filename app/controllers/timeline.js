"use strict";

var util = require('util'),
    _und = require('underscore'),
    config = require('../../config'),
    TimelineItemModel = require('../models/TimelineItem');

exports.insertItem = function(req, res, next) {
    var item = _und.pick( req.body, Object.keys(TimelineItemModel) );
    req.app.locals.mirrorClient.insertTimelineItem(item, function(err, insertedItem){
        if(err) return next('Error inserting timeline item.');
        req.session.message = 'Successfully inserted into timeline!';
        //res.locals.message = 'Successfully inserted into timeline!';

        res.redirect('/items/'+insertedItem.id);
    });
};

exports.listItems = function(req, res, next){
    req.app.locals.mirrorClient.listTimelineItems(10, function(err, timeline){
        if(err) return next('Error fetching timeline items.');
        console.log("returned items ::", timeline.items.length);
        
        res.locals.timelineItems = timeline.items;
        next();
    }); 
};

exports.getItem = function(req, res, next){
    req.app.locals.mirrorClient.getTimelineItem( req.params.id, function(err, timelineItem){
        if(err) return next("Error fetching timeline item.");
        console.log("returned item ::", timelineItem);
        res.locals.content = { timelineItem: timelineItem };        // Populate main content to be rendered
        next();
    });
};

exports.patchItem = function(req, res, next) {
    var item = _und.pick( req.body, Object.keys(TimelineItemModel) );
    req.app.locals.mirrorClient.patchTimelineItem( item, function(err){
        if(err) return next('Error deleting timeline item.');
        req.session.message = 'Successfully deleted timeline item.';
        //res.locals.message = 'Successfully deleted timeline item.';
        res.redirect('/');
    });
};

exports.deleteItem = function(req, res, next) {
    req.app.locals.mirrorClient.deleteTimelineItem( req.body.id, function(err){
        if(err) return next('Error deleting timeline item.');
        req.session.message = 'Successfully deleted timeline item.';
        //res.locals.message = 'Successfully deleted timeline item.';
        res.redirect('/');
    });
};

exports.getAttachmentProxy = function(req, res, next) {
    req.app.locals.mirrorClient.getTimelineAttachment( req.query.timelineItemId, req.query.attachmentId, function(err, attachment){ 
        if(err) return res.render('index', { alert: 'error', message: "Error getting attachment proxy!" });
        //req.app.locals.mirrorClient.download( attachment.content_url, next );
        console.log("attachment",  attachment );
        res.attachment( attachment.content_url );
        //res.type( attachment.contentType );
        //res.download( attachment.content_url );

    });
};
