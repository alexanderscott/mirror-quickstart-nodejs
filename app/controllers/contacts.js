"use strict";

var util = require('util'),
    _und = require('underscore'),
    config = require('../../config'),
    ContactModel = require('../models/Contact'),
    contactFixtures = require('../../fixture/contacts');

exports.listContacts = function(req, res, next) {
    req.app.locals.mirrorClient.listContacts(function(err, contacts){
        if(err) return next('Error listing contacst.');
        res.locals.contacts = contacts;
        next();
    });
};

exports.insertContact = function(req, res, next) {
    var contact = _und.pick( req.body, Object.keys(ContactModel) );
    contact.imageUrls = [
        (config.ssl ? 'https' : 'http' ) + '://' + config.host + config.port + '/assets/images/chipotle-tube-640x360.jpg' 
    ];

    req.app.locals.mirrorClient.insertContact(contact, function(err, insertedContact){
        if(err) return next('Error inserting contact.');
        res.locals.message = 'Successfully inserted contact';
        res.locals.content = { contactItem: insertedContact };
        next();
    });
};

exports.getContact = function(req, res, next){
    req.app.locals.mirrorClient.getContact( req.params.id, function(err, contact){
        if(err) return next('Error getting contact.');
        res.locals.content = { contactItem: contact };
        next();
    });
};

exports.deleteContact = function(req, res, next) {
    req.app.locals.mirrorClient.deleteContact( req.body.id, function(err){
        if(err) return next('Error deleting contact.');
        res.locals.message = 'Successfully deleted contact.';
        next();
    });
};
