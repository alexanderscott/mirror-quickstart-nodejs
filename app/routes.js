"use strict";

var config = require('../config'),
    timelineController = require('./controllers/timeline'),
    contactsController = require('./controllers/contacts'),
    subscriptionsController = require('./controllers/subscriptions'),
    authController = require('./controllers/auth');

module.exports = function(app) {

    var checkAuth = function(req, res, next) {
        if( !app.locals.mirrorClient.mirror ) {
            return res.redirect( app.locals.mirrorClient.getAuthUrl );
            //return res.send(401, { error: "Not authorized." });
        } else {
            next(); 
        }
    };

    app.get("/", function(req, res){
        res.render('index', { csrfToken: req.csrfToken() });
    });
    //app.get('/', contactsController.listContacts);
    app.post('/insert-contact', checkAuth, contactsController.insertContact);
    app.post('/delete-contact', checkAuth, contactsController.deleteContact);

    app.post('/insert-item', checkAuth, timelineController.insertItem);
    app.post('/insert-item-with-action', checkAuth, timelineController.insertItemWithAction);
    app.post('/insert-pretty-item', checkAuth, timelineController.insertPrettyItem);
    app.post('/insert-all-users', checkAuth, timelineController.insertAllUsers);
    app.post('/delete-item', checkAuth, timelineController.deleteItem);
    app.get('/attachment-proxy', checkAuth, timelineController.getAttachmentProxy);


    app.post('/insert-subscription', checkAuth, subscriptionsController.insertSubscription);
    app.post('/delete-subscription', checkAuth, subscriptionsController.deleteSubscription);
    app.post('/notify-callback', checkAuth, subscriptionsController.getNotificationCallback);

    app.get('/oauth2callback', authController.getOauthCallback);


};
