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
    app.get('/items/:id', checkAuth, timelineController.getItem, timelineController.listItems, renderIndex);
    app.post('/insert-item', checkAuth, timelineController.insertItem);
    app.post('/delete-item', checkAuth, timelineController.deleteItem);
    app.get('/attachment-proxy', checkAuth, timelineController.getAttachmentProxy);

    app.post('/insert-contact', checkAuth, contactsController.insertContact);
    app.post('/delete-contact/:id', checkAuth, contactsController.deleteContact);
    app.get('/contacts/:id', checkAuth, contactsController.getContact);

    app.post('/insert-subscription', checkAuth, subscriptionsController.insertSubscription);
    app.post('/delete-subscription', checkAuth, subscriptionsController.deleteSubscription);
    app.get('/subscriptions/:id', checkAuth, subscriptionsController.getSubscription);
    app.post('/notify-callback', checkAuth, subscriptionsController.getNotificationCallback, timelineController.listItems);

    app.get('/oauth2callback', authController.getOauthCallback);

};
