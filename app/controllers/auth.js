"use strict";

var util = require('util'),
    OAuthUtils = require('../../util/OAuthUtils'),
    async = require('async'),
    _und = require('underscore');

var CredentialsStore = require('../../lib/CredentialsStore'),
    credentialsStore = new CredentialsStore({});

function _tryLogin(mirrorClient, code, req, res, next){
    console.log("trying getTokens with code:: " + code );
    mirrorClient.getTokens(code, function(err, creds){
        if(err) return next('Could not get OAuth tokens from provided access code.');

        mirrorClient.oauth2Client.credentials = creds;
        console.log('returned creds:', creds);

        OAuthUtils.getUserInfo( mirrorClient.oauth2Client, creds, function(err, userInfo){
            if(err) return next('Could not get user info for the Mirror API Client.');

            console.log("getUserInfo res:", userInfo); 

            // Store user info in the session
            req.session.userId = userInfo.id;
            req.session.name = userInfo.name;
            req.session.picture = userInfo.picture;

            credentialsStore.storeCredentials( userInfo.id, creds, function(err, res){
                if(err) return next('Error saving credentials for offline use.');

                mirrorClient.createClient(function(err, res){
                    if(err) return next('Could not create a Mirror API Client.');
                    //res.redirect('/');
                    next();
                });
            });
        });
    });
}


exports.getOauthCallback = function(req, res, next){
    if(req.query.code) {

        // Try logging in using oauthcallback query params
        _tryLogin(req.app.locals.mirrorClient, req.query.code, req, res, next);

    } else if(req.session.userId){

        // If there is a userId in the session, try fetching and using creds from the db
        console.log('found userId in session', req.session.userId);
        credentialsStore.getStoredCredentials( req.session.userId, function(err, creds){
            if(err) return next('Error logging in with userId creds from db.');
            var code = require('querystring').stringify( JSON.parse(creds) );  
            _tryLogin(req.app.locals.mirrorClient, code, req, res, next);
        });

    } else {
        return next("No access code found to generate auth tokens in callback");
        //res.redirect('/');
    }
};
