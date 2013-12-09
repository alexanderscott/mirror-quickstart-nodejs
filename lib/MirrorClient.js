"use strict";

var googleApis = require('googleapis'),
    Oauth2Client = googleApis.Oauth2Client;

function MirrorClient(opts) {
    opts = opts || {};
    this.gClient = opts.gClient || {};
    this.oauth2Client = opts.oauth2Client || new OAuth2Client( opts.clientId, opts.clientSecret, opts.redirectUri );
    return this;
}

MirrorClient.prototype.getTokens = function(code, cb){
    this.oauth2Client.getToken(code, function(err, tokens){
        if(err) return cb(err);
        //self.credentials = tokens;
        cb(null, tokens);
    });
};

MirrorClient.prototype.createClient = function(){
    googleApis
        .discover('mirror', 'v1')
        .execute(function(err, gClient) {
            if(err) return cb(err);
            //console.log("Initialized googleApis mirror client...");

            //app.locals.gClient = gClient;
            self.mirror = gClient.mirror;

            cb(null, gClient);
    });
};

MirrorClient.prototype.getAuthUrl = function(){
    return this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/glass.timeline'
    });
};

MirrorClient.prototype.download = function(url, cb){
    this.mirror
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};


/**
 * TIMELINE ITEMS
 */
MirrorClient.prototype.listTimelineItems = function(num, cb){
    this.mirror
        .timeline
        .list()
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};

MirrorClient.prototype.getTimelineAttachment = function(timelineItemId, attachmentId, cb){
    this.mirror
        .timeline
        .get()
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};


MirrorClient.prototype.insertTimelineItem = function(opts, cb){
    this.mirror
        .timeline
        .insert( opts )
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};

MirrorClient.prototype.deleteTimelineItem = function(opts, cb){
    this.mirror
        .timeline
        .delete( opts )
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};


/**
 * CONTACTS
 */

MirrorClient.prototype.listContacts = function(opts, cb){
    this.mirror
        .contacts
        .list()
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};

MirrorClient.prototype.insertContact = function(opts, cb){
    this.mirror
        .contacts
        .insert( opts )
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};

MirrorClient.prototype.deleteContact = function(opts, cb){
    this.mirror
        .contacts
        .delete( opts )
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};



/**
 * SUBSCRIPTIONS
 */

MirrorClient.prototype.listSubscriptions = function(opts, cb){
    this.mirror
        .subscriptions
        .list()
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};

MirrorClient.prototype.insertSubscription = function(opts, cb){
    this.mirror
        .subscriptions
        .insert( opts )
        .withAuthClient( this.oauth2Client )
        .execute( cb );

    cb(null);
};

MirrorClient.prototype.deleteSubscription = function(opts, cb){
    this.mirror
        .subscriptions
        .delete( opts )
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};
    
module.exports = MirrorClient;
