"use strict";

var googleApis = require('googleapis'),
    util = require('util'),
    config = require('../config');


exports.exchangeCode = function(oauthClient, authCode, cb){
    googleApis
        .discover('oauth2', 'v2')
        .withAuthClient( oauthClient )
        .execute(function(err, gClient){
            if(err) return cb(err);
            cb(null, gClient);
        });
};

exports.getUserInfo = function(oauthClient, creds, cb){
    var self = this;
    googleApis
        .discover('oauth2', 'v2')
        .withAuthClient( oauthClient )
        .execute(function(err, gClient){
            if(err) return cb(err);
            gClient
                .oauth2
                .userinfo
                .get()
                .withAuthClient( oauthClient )
                .execute(function(err, res){
                    if(err) return cb(err);
                    console.log('gClient res from userinfo get:', res);
                    cb(null, res);
                });
        });
};

exports.getAuthUrl = function(oauthClient, userId, state, cb){
    //oauthClient.generateAuthUrl
    googleApis
        .discover('oauth2', 'v2')
        .withAuthClient( oauthClient )
        .execute(function(err, gClient){
            if(err) return cb(err);
            cb(null, gClient);
        });
};
