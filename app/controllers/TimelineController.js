"use strict";

var util = require('util'),
    _und = require('underscore'),
    cardHelper = require('../helpers/CardHelper'),
    TimelineItemModel = require('../models/TimelineItem');


function fixMenuItemMappings(item){
    item.menuItems = item.menuItems || [];
    var menuItems = item.menuItems.map(function(val, i){ 
        if(_und.isString(val)) return { action: val };
        else if(_und.isObject(val)) return val.action;
        else return val;
    });
    item.menuItems = menuItems;
    return item;
}

exports.insertTimelineItem = function(req, res, next) {
    var item = _und.pick( req.body, Object.keys(TimelineItemModel) );
    fixMenuItemMappings(item);
    //console.log("inserting item with attributes: " + util.inspect(item));
    req.app.locals.mirrorClient.insertTimelineItem(item, function(err, insertedItem){
        if(err) return next('Error inserting timeline item.');
        req.session.message = 'Successfully inserted into timeline!';
        res.redirect('/timeline/items/'+insertedItem.id);
    });
};

exports.listTimelineItems = function(req, res, next){
    req.app.locals.mirrorClient.listTimelineItems(10, function(err, timeline){
        if(err) return next('Error fetching timeline items.');
        res.locals.timeline = timeline;
        res.locals.content = { timelineItemNew: true };
        next();
    }); 
};

exports.getTimelineItem = function(req, res, next){
    req.app.locals.mirrorClient.getTimelineItem( req.params.id, function(err, timelineItem){
        if(err) return next("Error fetching timeline item.");
        fixMenuItemMappings(timelineItem);
        console.log("returned item ::", timelineItem);
        res.locals.content = { timelineItemUpdate: timelineItem };        // Populate main content to be rendered
        next();
    });
};

exports.patchTimelineItem = function(req, res, next) {
    var item = _und.pick( req.body, Object.keys(TimelineItemModel) );
    //console.log("pathing item with attributes: " + util.inspect(item));
    fixMenuItemMappings(item);
    req.app.locals.mirrorClient.patchTimelineItem( item, function(err, patchedItem){
        if(err) return next('Error patching timeline item.');
        req.session.message = 'Successfully patched timeline item.';
        res.redirect('/timeline/items/'+item.id);
    });
};

exports.updateTimelineItem = function(req, res, next) {
    var item = _und.pick( req.body, Object.keys(TimelineItemModel) );
    //console.log("updating item with attributes: " + util.inspect(item));
    fixMenuItemMappings(item);
    req.app.locals.mirrorClient.updateTimelineItem( item, function(err){
        if(err) return next('Error updating timeline item.');
        req.session.message = 'Successfully updated timeline item.';
        res.redirect('/timeline/items/'+item.id);
    });
};

exports.deleteTimelineItem = function(req, res, next) {
    req.app.locals.mirrorClient.deleteTimelineItem( req.body.id, function(err){
        if(err) return next('Error deleting timeline item.');
        req.session.message = 'Successfully deleted timeline item.';
        res.redirect('/timeline');
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
