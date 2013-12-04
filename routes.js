"use strict";

var app = require('./app'),
    timelineController = require('./controllers/timeline'),
    contactsController = require('./controllers/contacts'),
    subscriptionsController = require('./controllers/subscriptions'),
    authController = require('./controllers/auth');


app.get('/', contactsController.listContacts);
app.post('/insert-contact', contactsController.insertContact);
app.post('/delete-contact', contactsController.deleteContact);

app.post('/insert-item', timelineController.insertItem);
app.post('/insert-item-with-action', timelineController.insertItemWithAction);
app.post('/insert-pretty-item', timelineController.insertPrettyItem);
app.post('/insert-all-users', timelineController.insertAllUsers);
app.post('/delete-item', timelineController.deleteItem);
app.get('/attachment-proxy', timelineController.getAttachmentProxy);


app.post('/insert-subscription', subscriptionsController.insertSubscription);
app.post('/delete-subscription', subscriptionsController.deleteSubscription);
app.post('/notify-callback', subscriptionsController.getNotificationCallback);

app.get('/oauth2callback', authController.getOauthCallback);
