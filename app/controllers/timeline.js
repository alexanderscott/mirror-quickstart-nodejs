"use strict";

var util = require('util'),
    _und = require('underscore'),
    TimelineItemModel = require('../models/TimelineItem'),
    timelineFixtures = require('../../fixture/timelineItems');

exports.insertItem = function(req, res) {
    var item = _und.pick( req.body, TimelineItemModel );
    req.app.locals.mirrorClient.insertTimelineItem(item, function(err, insertedItem){
        if(err) return res.render('index', { alert: 'error', message: 'Error inserting into timeline.' });
        res.render('index', { message: 'Successfully inserted into timeline!' });
    });
};

exports.listItems = function(req, res, next){
    req.app.locals.mirrorClient.listTimelineItems(10, function(err, items){
        if(err) return res.render('index');
        res.render('index');
    }); 
};

exports.deleteItem = function(req, res, next) {
    req.app.locals.mirrorClient.deleteTimelineItem( req.body.id, function(err){
        if(err) return res.render('index', { alert: 'error', message: 'Error deleting timeline item.' });
        res.render('index', { message: 'Successfully deleted from timeline!' });
    });
};

exports.insertAllUsers = function(req, res, next) {
    res.render('index');
};

exports.insertPrettyItem = function(req, res, next) {
    var item = _und.pick( req.body, TimelineItemModel );
    req.app.locals.mirrorClient.insertTimelineItem(item, function(err){
        if(err) return res.render('index', { alert: 'error', message: 'Error inserting into timeline.' });
        res.render('index', { message: 'Successfully inserted into timeline!' });
    });
};

exports.insertItemWithAction = function(req, res, next) {
    var item = _und.pick( req.body, TimelineItemModel );
    req.app.locals.mirrorClient.insertTimelineItem(item, function(err){
        if(err) return res.render('index', { alert: 'error', message: 'Error inserting into timeline.' });
        res.render('index', { message: 'Successfully inserted into timeline!' });
    });
};

exports.getAttachmentProxy = function(req, res, next) {
    req.app.locals.mirrorClient.getTimelineAttachment( req.query.timelineId, req.query.attachmentId, function(err, attachment){ 
        if(err) return res.render('index', { alert: 'error', message: "Error getting attachment proxy!" });
        req.app.locals.mirrorClient.download( attachment.content_url, next );
    });
};
