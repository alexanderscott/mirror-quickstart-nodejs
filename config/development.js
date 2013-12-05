"use strict";

// Development config options go here
module.exports = {
    port: 3000,
    sessionSecret: '[[DEVELOPMENT_SESSION_SECRET]]',
    googleApis: {
        clientId: "[[DEVELOPMENT_CLIENT_ID]]",
        clientSecret: "[[DEVELOPMENT_CLIENT_SECRET]]",
        redirectUris: [
            "[[DEVELOPMENT_REDIRECT_URI]]"
        ]
    }
};
