"use strict";

var util = require('util'),
    _und = require('underscore'),
    contactFixtures = require('../../fixture/contacts');

exports.listContacts = function(req, res) {
    req.app.locals.mirrorClient.listContacts(function(err, contacts){
        if(err) return res.error(err);
        res.json({ contacts: contacts });
    });
};

exports.insertContact = function(req, res) {
    //var contact = { };
    var contact = _und.sample( contactFixtures );
    req.app.locals.mirrorClient.insertContact(contact, function(err){
        if(err) return res.error(err);
        res.json({});
    });
};

exports.deleteContact = function(req, res) {
    var contact = { };
    req.app.locals.mirrorClient.deleteContact(contact, function(err){
        if(err) return res.error(err);
        res.json({});
    });
};
