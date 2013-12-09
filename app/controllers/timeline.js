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
    req.app.locals.mirrorClient.deleteTimelineItem( req.param.id, function(err){
        if(err) return res.error(err);
        res.json({});
    });
}

exports.insertAllUsers = function(req, res) {

    res.json({});
}

exports.insertPrettyItem = function(req, res) {
    var item = _und.sample( timelineFixtures );

    req.app.locals.mirrorClient.insertItemItem(item, function(err){
        if(err) return res.error(err);
        res.json({});
    });
}

exports.insertItemWithAction = function(req, res) {
    var item = _und.sample( timelineFixtures );

    req.app.locals.mirrorClient.insertItemItem(item, function(err){
        if(err) return res.error(err);
        res.json({});
    });
}

exports.getAttachmentProxy = function(req, res) {

    res.json({});
}
