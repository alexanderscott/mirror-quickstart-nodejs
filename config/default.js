"use strict";

// Default config options go here
module.exports = {
    googleApis: {
        scopes: [
            'https://www.googleapis.com/auth/glass.timeline',
            'https://www.googleapis.com/auth/glass.location',
            'https://www.googleapis.com/auth/userinfo.profile'
        ],
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://accounts.google.com/o/oauth2/token"
    }
};
