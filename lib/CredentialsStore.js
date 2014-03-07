"use strict";

var bcrypt = require('bcrypt'),
    sqlite = require("sqlite3").verbose();

    
function CredentialsStore(opts){
    // Initialize sqlite and create our db if it doesnt exist
    this.db = new sqlite.Database('./db/mirror-creds.db');

    // Create our users table if it doesn't exist
    this.db.run("CREATE TABLE IF NOT EXISTS credentials (user_id TEXT NOT NULL UNIQUE, creds_hash TEXT NOT NULL)");
    return this;
}

CredentialsStore.prototype.storeCredentials = function(userId, creds, cb){
    if(!userId) return cb("No userId supplied");

    var hash = {
        access_token: creds.access_token,
        refresh_token: creds.refresh_token
    };

    this.db.run('INSERT OR REPLACE INTO credentials VALUES (?, ?)', [ userId, JSON.stringify(hash) ], cb);
};

CredentialsStore.prototype.listStoredUserIds = function(cb){
    this.db.get('SELECT user_id FROM credentials');
};

CredentialsStore.prototype.getStoredCredentials = function(userId, cb){
    this.db.get('SELECT creds_hash FROM credentials WHERE user_id = ?', [ userId ], cb);
};

CredentialsStore.prototype.deleteStoredCredentials = function(userId, cb){
    this.db.run('DELETE FROM credentials WHERE user_id = ?', [userId], cb);
};

exports = module.exports = CredentialsStore;
