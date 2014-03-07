"use strict";

var util = require('util'),
    async = require('async'),
    _und = require('underscore');

var CredentialsStore = require('../../lib/CredentialsStore'),
    credentialsStore = new CredentialsStore({});

function _tryLogin(mirrorClient, code, cb){

    mirrorClient.authorize(code, function(err, creds){
        if(err) return cb(err);

        mirrorClient.getUserInfo(function(err, res){
            if(err) return cb(err);

            credentialsStore.storeCredentials( res.id, creds, function(err, res){
                if(err) return cb(err);
                cb(null, res);
            });
        });
    });
}


exports.getOauthCallback = function(req, res, next){
    if(req.query.code) {
        _tryLogin(req.app.locals.mirrorClient, req.query.code, function(err, credsRes){
            if(err) return res.redirect( req.app.locals.mirrorClient.getAuthUrl() );
            res.redirect('/');
            //next();
        });
    } else if(!req.session.userId){
        res.redirect( req.app.locals.mirrorClient.getAuthUrl() );
    } else {
        console.log("trying to use existing creds for user id:: " + req.session.userId);
        credentialsStore.getStoredCredentials( req.session.userId, function(err, creds){
            if(err) return res.redirect( req.app.locals.mirrorClient.getAuthUrl() );
            var code = require('querystring').stringify( JSON.parse(creds) );  

            _tryLogin(req.app.locals.mirrorClient, code, function(err, credsRes){
                if(err) return res.redirect( req.app.locals.mirrorClient.getAuthUrl() );
                res.redirect('/');
                //next();
            });
        });
    }
};
