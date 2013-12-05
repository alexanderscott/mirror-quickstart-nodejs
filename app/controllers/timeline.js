"use strict";

exports.insertTimelineItem(req, res) {
    var item = {

    };
    req.app.locals.mirrorClient.insertTimelineItem(item, function(err){
        if(err) return res.error(err);
        res.json({});
    });
}

exports.deleteTimelineItem(req, res) {
    var item = {

    };
    req.app.locals.mirrorClient.deleteTimelineItem(item, function(err){
        if(err) return res.error(err);
        res.json({});
    });
}

exports.insertAllUsers(req, res) {

    res.json({});
}

exports.insertPrettyItem(req, res) {
    var item = {

    };
    req.app.locals.mirrorClient.deleteTimelineItem(item, function(err){
        if(err) return res.error(err);
        res.json({});
    });
}

exports.insertItemWithAction(req, res) {
    var item = {

    };
    req.app.locals.mirrorClient.deleteTimelineItem(item, function(err){
        if(err) return res.error(err);
        res.json({});
    });
}

exports.getAttachmentProxy(req, res) {

    res.json({});
}
