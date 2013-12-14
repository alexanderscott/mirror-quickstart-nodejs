"use strict";

var googleApis = require('googleapis'),
    OAuth2Client = googleApis.OAuth2Client;

function MirrorClient(opts) {
    opts = opts || {};
    this.gClient = opts.gClient || {};
    this.oauth2Client = opts.oauth2Client || new OAuth2Client( opts.clientId, opts.clientSecret, opts.redirectUri );
    this.scope = opts.scope || [];
    return this;
}

/**
 * Fetch tokens from the oauthClient using specified code.
 * @param {String} code - access code obtained from query param
 * @param {function) cb - callback(error, response)
**/
MirrorClient.prototype.getTokens = function(code, cb){
    this.oauth2Client.getToken(code, function(err, tokens){
        if(err) return cb(err);
        //self.credentials = tokens;
        cb(null, tokens);
    });
};

//MirrorClient.prototype.getUserId = function(cb){
    //var self = this;
    //googleApis
        //.discover('oauth2', 'v2')
        //.execute(function(err, gClient){
            //if(err) return cb(err);

        //});
//};

/**
 * Creates a Google Mirror API client and attaches to this parent object.  
 * @param {function} cb - callback(error, response)
**/
MirrorClient.prototype.createClient = function(cb){
    var self = this;
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

/**
 * Downloads data from the specified URL, using an authorized connection.
 * @param {String} url
 * @param {function} cb - callback(error, response)
**/
MirrorClient.prototype.getAuthUrl = function(){
    console.log('scope:' + this.scope);
    return this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: this.scope
    });
};

/**
 * Downloads data from the specified URL, using an authorized connection.
 * @param {String} url
 * @param {function} cb - callback(error, response)
**/
MirrorClient.prototype.download = function(url, cb){
    this.mirror
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};


/**
 * Retrieves (at most) the most recent "max_results" timeline cards that were
 * inserted by this Glassware. Paging is not supported by this call.
 * @param {Integer} num - max number of items to retrieve
 * @param {function} cb - callback(error, response)
**/
MirrorClient.prototype.listTimelineItems = function(num, cb){
    this.mirror
        .timeline
        .list({ maxResults: num })
        //.withOpts({ maxResults: num })
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};

/**
 * Retrieves the TimelineItem with the specified identifier.
 * @param {String} itemId - timeline item identifier
 * @param {function} cb - callback(error, response)
**/
MirrorClient.prototype.getTimelineItem = function(itemId, cb){
    this.mirror
        .timeline
        .get()
        .withOpts({ itemId: itemId })
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};

/**
 * Gets the attachment associated with a timeline item.
 * @param {String} itemId - timeline item identifier
 * @param {String} attachmentId - attachment item identifier
 * @param {function} cb - callback(error, response)
**/
MirrorClient.prototype.getTimelineItemAttachment = function(itemId, attachmentId, cb){
    this.mirror
        .timeline
        .get({ itemId: itemId, attachmentId: attachmentId })
        //.withOpts({ itemId: itemId, attachmentId: attachmentId })
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};

/**
 * Inserts a timeline card, with an optional attachment, into the user's timeline.
 * @param {Object} opts - optional params (item, attachment)  
 * @param {function} cb - callback(error, response)
 **/
MirrorClient.prototype.insertTimelineItem = function(opts, cb){
    this.mirror
        .timeline
        .insert(opts)
        //.withOpts( opts )
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};

/**
 * Deletes the timeline item with the specified identifier.
 * @param {String} itemId - timeline item identifier
 * @param {function} cb - callback(error, response)
**/
MirrorClient.prototype.deleteTimelineItem = function(itemId, cb){
    this.mirror
        .timeline
        .delete( itemId )
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};



/**
 * Lists the contacts on this Glass.
 * @param {Object} opts - optional params (item, attachment)  
 * @param {function} cb - callback(error, response)
**/
MirrorClient.prototype.listContacts = function(opts, cb){
    this.mirror
        .contacts
        .list( opts )
        //.withOpts( opts )
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};

/**
 * Inserts a contact on this Glass.
 * @param {Object} opts - contact object - (id, displayName, imageUrls)  
 * @param {function} cb - callback(error, response)
**/
MirrorClient.prototype.insertContact = function(opts, cb){
    this.mirror
        .contacts
        .insert( opts )
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};

/**
 * Deletes a contact from this Glass.
 * @param {Object} contactId - contact identifier
 * @param {function} cb - callback(error, response)
**/
MirrorClient.prototype.deleteContact = function(contactId, cb){
    this.mirror
        .contacts
        .delete( contactId )
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};



/**
 * Lists the subscriptions on this Glass.
 * @param {Object} opts - optional params (item, attachment)  
 * @param {function} cb - callback(error, response)
**/
MirrorClient.prototype.listSubscriptions = function(opts, cb){
    this.mirror
        .subscriptions
        .list()
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};

/**
 * Inserts a subscription on this Glass.
 * @param {String} userToken
 * @param {String} collection - the collection ('timeline' or 'location') to subscribe to
 * @param {String} callbackUrl - the URL which will receive a POST request when a notification occurs
 * @param {function} cb - callback(error, response)
**/
MirrorClient.prototype.insertSubscription = function(userToken, collection, callbackUrl, cb){
    this.mirror
        .subscriptions
        .insert({ userToken: userToken, collection: collection, callbackUrl: callbackUrl })
        .withAuthClient( this.oauth2Client )
        .execute( cb );

    cb(null);
};

/**
 * Deletes a subscription this Glass.
 * @param {Object} subscriptionId - subscription identifier
 * @param {function} cb - callback(error, response)
**/
MirrorClient.prototype.deleteSubscription = function(subscriptionId, cb){
    this.mirror
        .subscriptions
        .delete( subscriptionId )
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};


/**
 * Get the user's location
 * @param {Object} locationId - location identifier, defaults to 'latest' for most recent
 * @param {function} cb - callback(error, response)
**/
MirrorClient.prototype.getLocation = function(opts, cb){
    this.mirror
        .location
        .get( opts )
        //.withOpts( opts )
        .withAuthClient( this.oauth2Client )
        .execute( cb );
};
    
module.exports = MirrorClient;
