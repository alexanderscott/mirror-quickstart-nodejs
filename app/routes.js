"use strict";

var util = require('util'),
    _und = require('underscore'),
    config = require('../config'),
    timelineController = require('./controllers/timeline'),
    contactsController = require('./controllers/contacts'),
    subscriptionsController = require('./controllers/subscriptions'),
    authController = require('./controllers/auth');

module.exports = function(app) {

    function checkAuth(req, res, next) {
        if( !app.locals.mirrorClient.mirror ) {

            // If the Mirror client has not been established, redirect user to Google auth URL
            console.log("redirecting to::" +  req.app.locals.mirrorClient.getAuthUrl() );
            return res.redirect( req.app.locals.mirrorClient.getAuthUrl() );

        } else next(); 
    }

    function renderIndex(req, res, next){ res.render('index'); }
    function redirectIndex(req, res, next){ res.redirect('/'); }

    app.get('/', checkAuth, timelineController.listItems, renderIndex);
    app.get('/timeline/items/:id', checkAuth, timelineController.getItem, timelineController.listItems, renderIndex);
    app.post('/timeline/insert', checkAuth, timelineController.insertItem);
    app.post('/timeline/delete', checkAuth, timelineController.deleteItem);
    app.post('/timeline/patch', checkAuth, timelineController.patchItem);
    app.post('/timeline/update', checkAuth, timelineController.updateItem);

    app.get('/attachment-proxy', checkAuth, timelineController.getAttachmentProxy);

    app.get('/contacts/contact/:id', checkAuth, contactsController.getContact);
    app.get('/contacts/list', checkAuth, contactsController.listContacts);
    app.post('/contacts/insert', checkAuth, contactsController.insertContact);
    app.post('/contacts/delete', checkAuth, contactsController.deleteContact);
    app.post('/contacts/patch', checkAuth, contactsController.patchContact);
    app.post('/contacts/update', checkAuth, contactsController.updateContact);

    app.get('/subscriptions/list', checkAuth, subscriptionsController.listSubscriptions);
    app.get('/subscriptions/subscription/:id', checkAuth, subscriptionsController.getSubscription);
    app.post('/subscriptions/insert', checkAuth, subscriptionsController.insertSubscription);
    app.post('/subscriptions/update', checkAuth, subscriptionsController.updateSubscription);
    app.post('/subscriptions/delete', checkAuth, subscriptionsController.deleteSubscription);

    app.post('/notify-callback', checkAuth, subscriptionsController.getNotificationCallback, timelineController.listItems);

    app.get('/oauth2callback', authController.getOauthCallback);

};
