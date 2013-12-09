"use strict";

var util = require('util'),
    _und = require('underscore'),
    contactFixtures = require('../../fixtures/contacts');

exports.listContacts(req, res) {
    req.app.locals.mirrorClient.listContacts(function(err, contacts){
        if(err) return res.error(err);
        res.json({ contacts: contacts });
    });
};

exports.insertContact(req, res) {
    //var contact = { };
    var contact = _und.sample( contactFixtures );
    req.app.locals.mirrorClient.insertContact(contact, function(err){
        if(err) return res.error(err);
        res.json({});
    });
};

exports.deleteContact(req, res) {
    var contact = { };
    req.app.locals.mirrorClient.deleteContact(contact, function(err){
        if(err) return res.error(err);
        res.json({});
    });
};
