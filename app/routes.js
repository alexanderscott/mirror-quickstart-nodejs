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
        res.locals.csrfToken = req.csrfToken();
        if( !app.locals.mirrorClient.mirror ) {
            return res.redirect( app.locals.mirrorClient.getAuthUrl() );
            //return res.send(401, { error: "Not authorized." });
        } else {
            next(); 
        }
    }

    app.get('/', checkAuth, timelineController.listItems);
    app.get('/item/:id', checkAuth, timelineController.getItem);
    app.post('/insert-item', checkAuth, timelineController.insertItem, timelineController.listItems);
    app.post('/insert-item-with-action', checkAuth, timelineController.insertItemWithAction, timelineController.listItems);
    app.post('/insert-pretty-item', checkAuth, timelineController.insertPrettyItem, timelineController.listItems);
    app.post('/insert-all-users', checkAuth, timelineController.insertAllUsers, timelineController.listItems);
    app.post('/delete-item', checkAuth, timelineController.deleteItem, timelineController.listItems);
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
