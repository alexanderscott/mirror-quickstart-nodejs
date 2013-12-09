"use strict";

var util = require('util'),
    _und = require('underscore'),
    timelineFixtures = require('../../fixture/timelineItems');

exports.insertItem = function(req, res) {
    var item = _und.sample( timelineFixtures );
    req.app.locals.mirrorClient.insertTimelineItem(item, function(err){
        if(err) return res.error(err);
        res.json({});
    });
}

exports.deleteItem = function(req, res) {
    var item = {

    };
    req.app.locals.mirrorClient.deleteTimelineItem(item, function(err){
        if(err) return res.error(err);
        res.json({});
    });
}

exports.insertAllUsers = function(req, res) {

    res.json({});
}

exports.insertPrettyItem = function(req, res) {
    //var item = { };
    var item = _und.sample( timelineFixtures );

    req.app.locals.mirrorClient.deleteTimelineItem(item, function(err){
        if(err) return res.error(err);
        res.json({});
    });
}

exports.insertItemWithAction = function(req, res) {
    //var item = { };
    var item = _und.sample( timelineFixtures );
    req.app.locals.mirrorClient.deleteTimelineItem(item, function(err){
        if(err) return res.error(err);
        res.json({});
    });
}

exports.getAttachmentProxy = function(req, res) {

    res.json({});
}
