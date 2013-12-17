"use strict";

var assert = require('assert'),
    _und = require('underscore'),
    async = require('async'),
    contactsFixtures = require('./fixtures/contacts'),
    contactModel = require('../app/models/Contact'),
    contactsController = require('../app/controllers/ContactsController');

var insertedContactIds = [];

describe('contacts', function() {
    before(function(cb) {
        cb();
    });

    beforeEach(function(cb) {
        cb();
    });

    afterEach(function(cb) {
        cb();
    });

    after(function(cb) {
        // Clean up all of the test timeline items we inserted
        async.each(insertedContactIds, contactsController.deleteContact, function(err, res){
            assert.ifError(err);
            cb();
        });
    });

    describe('#insertContact()', function() {
        it('inserts a contact', function(cb) {
            var contact = contactsFixtures[0];
            contactsController.insertContact(contact, function(err, insertedContact){
                assert.ifError(err);
                assert.ok( contact.displayName === insertedContact.displayName, 'inserted contact displayName matches intended text' );
                assert.ok( insertedContact.id, 'inserted contact has an assigned id');
                insertedContactIds.push( insertedContact.id );
                cb();
            });
        });
    });

    describe('#listContacts()', function() {
        it('returns a list of contacts', function(cb) {
            contactsController.listContacts(function(err, contacts){
                assert.ifError(err);
                assert.ok( !_und.isEmpty(contacts), 'list of contacts does not return empty');
                cb();
            });
        });
    });

    describe('#deleteContact()', function() {
        it('deletes a contact', function(cb) {
            var contact = contactsFixtures[0];
            contactsController.insertContact(contact, function(err, insertedContact){
                assert.ifError(err);
                contactsController.deleteContact(insertedContact.id, function(err, res){
                    assert.ifError(err);
                    contactsController.getContact(insertedContact.id, function(err, res){
                        assert.ifError(err);
                        assert.ok( _und.isEmpty(res), 'contact cannot be retrieved after it has been deleted' );
                        cb();
                    });
                });
            });
        });
    });

});
