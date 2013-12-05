"use strict";

// Default config options go here
module.exports = {
    port: 8888,
    sessionSecret: '[[PRODUCTION_SESSION_SECRET]]',
    googleApis: {
        clientId: "[[PRODUCTION_CLIENT_ID]]",
        clientSecret: "[[PRODUCTION_CLIENT_SECRET]]",
        redirectUris: [
            "[[PRODUCTION_REDIRECT_URI]]"
        ]
    }

};
