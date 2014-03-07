"use strict";

var util = require('util'),
    _und = require('underscore'),
    timelineController = require('./controllers/TimelineController'),
    contactsController = require('./controllers/ContactsController'),
    locationsController = require('./controllers/LocationsController'),
    subscriptionsController = require('./controllers/SubscriptionsController'),
    authController = require('./controllers/AuthController');

module.exports = function(app) {

    function checkAuth(req, res, next) {
        //res.locals.csrfToken = req.csrfToken();
        
        // Flush any message stored in the session
        req.session.message = null;

        if( !app.locals.mirrorClient.mirror ) {

            // If the Mirror client has not been established, redirect user to Google auth URL
            console.log("redirecting to::" +  req.app.locals.mirrorClient.getAuthUrl() );
            res.redirect( req.app.locals.mirrorClient.getAuthUrl() );

        } else next(); 
    }

    function renderIndex(req, res, next){ res.render('index'); }
    function redirectIndex(req, res, next){ res.redirect('/'); }

    app.get('/', checkAuth, timelineController.listTimelineItems, renderIndex);
    app.get('/timeline', checkAuth, timelineController.listTimelineItems, renderIndex);
    app.get('/timeline/items/:id', checkAuth, timelineController.listTimelineItems, timelineController.getTimelineItem, renderIndex);
    app.post('/timeline/insert', checkAuth, timelineController.insertTimelineItem);
    app.post('/timeline/delete', checkAuth, timelineController.deleteTimelineItem);
    app.post('/timeline/patch', checkAuth, timelineController.patchTimelineItem);
    app.post('/timeline/update', checkAuth, timelineController.updateTimelineItem);

    app.get('/attachment-proxy', checkAuth, timelineController.getAttachmentProxy);

    app.get('/contacts/contact/:id', checkAuth, contactsController.listContacts, contactsController.getContact, renderIndex);
    app.get('/contacts', checkAuth, contactsController.listContacts, renderIndex);
    app.post('/contacts/insert', checkAuth, contactsController.insertContact);
    app.post('/contacts/delete', checkAuth, contactsController.deleteContact);
    app.post('/contacts/patch', checkAuth, contactsController.patchContact);
    app.post('/contacts/update', checkAuth, contactsController.updateContact);

    app.get('/locations/:id', checkAuth, locationsController.listLocations, locationsController.getLocation, renderIndex);
    app.get('/locations', checkAuth, locationsController.listLocations, renderIndex);

    app.get('/subscriptions', checkAuth, subscriptionsController.listSubscriptions, renderIndex);
    app.get('/subscriptions/subscription/:id', checkAuth, subscriptionsController.listSubscriptions, subscriptionsController.getSubscription, renderIndex);
    app.post('/subscriptions/insert', checkAuth, subscriptionsController.insertSubscription);
    app.post('/subscriptions/update', checkAuth, subscriptionsController.updateSubscription);
    app.post('/subscriptions/delete', checkAuth, subscriptionsController.deleteSubscription);

    app.post('/notify-callback', checkAuth, subscriptionsController.getNotificationCallback, timelineController.listTimelineItems);

    app.get('/oauth2callback', authController.getOauthCallback);

};
