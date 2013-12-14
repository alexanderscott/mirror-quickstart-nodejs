"use strict";

var util = require('util'),
    _und = require('underscore'),
    timelineFixtures = require('../../fixture/timelineItems');

exports.insertItem = function(req, res) {
    //var item = _und.sample( timelineFixtures );
    var item = req.body;
    console.log( req.body );
    //req.app.locals.mirrorClient.insertItem(item, function(err){
        //if(err) return res.error(err);
        //res.json({});
    //});
};

exports.deleteItem = function(req, res) {
    req.app.locals.mirrorClient.deleteItem( req.param.id, function(err){
        if(err) return res.error(err);
        res.json({});
    });
};

exports.insertAllUsers = function(req, res) {

    res.json({});
};

exports.insertPrettyItem = function(req, res) {
    var item = _und.sample( timelineFixtures );

    req.app.locals.mirrorClient.insertItem(item, function(err){
        if(err) return res.error(err);
        res.json({});
    });
};

exports.insertItemWithAction = function(req, res) {
    var item = _und.sample( timelineFixtures );

    req.app.locals.mirrorClient.insertItem(item, function(err){
        if(err) return res.error(err);
        res.json({});
    });
};

exports.getAttachmentProxy = function(req, res) {

    res.json({});
};
