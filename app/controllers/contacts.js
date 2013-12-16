"use strict";

var util = require('util'),
    _und = require('underscore'),
    config = require('../../config'),
    ContactModel = require('../models/Contact');

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
        console.log("inserted contact with err and res::", err, insertedContact);
        if(err) return next('Error inserting contact.');
        req.session.message = 'Successfully inserted contact';
        res.redirect('/contacts/'+insertedContact.id);
    });
};

exports.getContact = function(req, res, next){
    req.app.locals.mirrorClient.getContact( req.params.id, function(err, contact){
        if(err) return next('Error getting contact.');
        res.locals.content = { contactItem: contact };
        next();
    });
};

exports.patchContact = function(req, res, next){
    var contact = _und.pick( req.body, Object.keys(ContactModel) );
    req.app.locals.mirrorClient.patchContact( contact, function(err, contact){
        if(err) return next('Error getting contact.');
        res.locals.content = { contactItem: contact };
        next();
    });
};

exports.updateContact = function(req, res, next){
    var contact = _und.pick( req.body, Object.keys(ContactModel) );
    req.app.locals.mirrorClient.updateContact( contact, function(err, contact){
        if(err) return next('Error getting contact.');
        res.locals.content = { contactItem: contact };
        next();
    });
};

exports.deleteContact = function(req, res, next) {
    req.app.locals.mirrorClient.deleteContact( req.body.id, function(err){
        if(err) return next('Error deleting contact.');
        req.session.message = 'Successfully deleted contact.';
        res.redirect('/');
    });
};
