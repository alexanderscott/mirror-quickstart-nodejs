"use strict";

var config = require('../config'),
    bcrypt = require('bcrypt'),
    sqlite = require("sqlite3").verbose();

    
function CredentialsStore(opts){
    // Initialize sqlite and create our db if it doesnt exist
    //this.db = new sqlite.Database(__dirname+'../db/mirror-creds.db');
    this.db = {};

    // Create our users table if it doesn't exist
    //this.db.run("CREATE TABLE IF NOT EXISTS credentials (user_id TEXT NOT NULL UNIQUE, creds_hash TEXT NOT NULL)");
    return this;
}

CredentialsStore.prototype.storeCredentials = function(userId, creds, cb){
    var hash = {
        access_token: creds.access_token,
        refresh_token: creds.refresh_token
    };

    this.db.execute('INSERT OR REPLACE INTO credentials VALUES (?, ?)', [ user_id, JSON.stringify(hash) ], cb);
};

CredentialsStore.prototype.listStoredUserIds = function(cb){
    this.db.execute('SELECT user_id FROM credentials');
};

CredentialsStore.prototype.getStoredCredentials = function(userId, cb){
    this.db.execute('SELECT creds_hash FROM credentials WHERE user_id = ?', [ userId ], cb);
};

exports = module.exports = CredentialsStore;
