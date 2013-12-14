"use strict";

var util = require('util'),
    _und = require('underscore'),
    ContactModel = require('../models/Contact'),
    contactFixtures = require('../../fixture/contacts');

exports.listContacts = function(req, res) {
    req.app.locals.mirrorClient.listContacts(function(err, contacts){
        if(err) return res.render('index', { alert: 'error', message: 'Error listing contacst.' });
        res.render('index', { contacts: contacts });
    });
};

exports.insertContact = function(req, res) {
    var contact = _und.pick( req.body, ContactModel );
    req.app.locals.mirrorClient.insertContact(contact, function(err, insertedContact){
        if(err) return res.render('index', { alert: 'error', message: 'Error inserting contact.' });
        res.render('index', { message: 'Successfully inserted contact with id ' + insertedContact.id });
    });
};

exports.deleteContact = function(req, res) {
    req.app.locals.mirrorClient.deleteContact( req.body.id, function(err){
        if(err) return res.render('index', { alert: 'error', message: 'Error deleting contact.' });
        res.render('index', { message: 'Successfully deleted contact with id ' + req.body.id + '.' });
    });
};
