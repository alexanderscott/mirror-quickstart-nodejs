"use strict";

var util = require('util'),
    _und = require('underscore'),
    ContactModel = require('../models/Contact');

exports.listContacts = function(req, res, next) {
    req.app.locals.mirrorClient.listContacts(function(err, contacts){
        if(err) return next('Error listing contacts.');
        res.locals.contacts = contacts;
        //console.log("contacts:" + util.inspect(contacts));
        res.locals.content = { contactNew: true };

        next();
    });
};

exports.insertContact = function(req, res, next) {
    var contact = _und.pick( req.body, Object.keys(ContactModel) );
    contact.imageUrls = [
        '/assets/images/chipotle-tube-640x360.jpg' 
    ];

    req.app.locals.mirrorClient.insertContact(contact, function(err, insertedContact){
        if(err) return next('Error inserting contact.');
        req.session.message = 'Successfully inserted contact';
        res.redirect('/contacts/contact/'+insertedContact.id);
    });
};

exports.getContact = function(req, res, next){
    req.app.locals.mirrorClient.getContact( req.params.id, function(err, contact){
        if(err) return next('Error getting contact.');
        res.locals.content = { contactUpdate: contact };
        next();
    });
};

exports.patchContact = function(req, res, next){
    var contact = _und.pick( req.body, Object.keys(ContactModel) );
    if(_und.isString(contact.imageUrls)){
        var arr = [];
        arr.push(_und.clone(contact.imageUrls));
        contact.imageUrls = arr;
    }
    req.app.locals.mirrorClient.patchContact( contact, function(err, contact){
        if(err) return next('Error patching contact.');
        req.session.message = 'Successfully patched contact.';
        res.redirect('/contacts/contact/'+contact.id);
    });
};

exports.updateContact = function(req, res, next){
    var contact = _und.pick( req.body, Object.keys(ContactModel) );
    if(_und.isString(contact.imageUrls)){
        var arr = [];
        arr.push(_und.clone(contact.imageUrls));
        contact.imageUrls = arr;
    }

    req.app.locals.mirrorClient.updateContact( contact, function(err, updatedContact){
        if(err) return next('Error updating contact.');
        req.session.message = 'Successfully updated contact.';
        res.redirect('/contacts/contact/'+contact.id);
    });
};

exports.deleteContact = function(req, res, next) {
    req.app.locals.mirrorClient.deleteContact( req.body.id, function(err){
        if(err) return next('Error deleting contact.');
        req.session.message = 'Successfully deleted contact.';
        res.redirect('/contacts');
    });
};
