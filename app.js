"use strict";

var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    _ = require("underscore"),
    async = require('async'),
    path = require("path"),
    config = require('./config'),
    MirrorClient = require('./lib/MirrorClient'),

    app = express(),
    server;

app.locals.mirrorClient = new MirrorClient({
    clientId: config.googleApis.clientId,
    clientSecret: config.googleApis.clientSecret,
    redirectUri: config.googleApis.redirectUris[0],
    scope: config.googleApis.scope.join(' ')
});

// Allow node to be run with proxy passing
app.enable('trust proxy');

// Compression (gzip)
app.use( express.compress() );
app.use( express.methodOverride() );
app.use( express.urlencoded() );            // Needed to parse POST data sent as JSON payload
app.use( express.json() );

// Session setup
app.use( express.cookieParser( config.cookieSecret ) );           // populates req.signedCookies
app.use( express.session( { secret: config.sessionSecret }) );         // populates req.session, needed for CSRF


// // We need serverside view templating to initially set the CSRF token in the <head> metadata
// // Otherwise, the html could just be served statically from the public directory
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views' );
app.engine('html', require('hbs').__express);


app.use("/public", express.static(__dirname+'/public'));
app.use(express.csrf());

// Logging config
app.configure('local', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
    app.use(express.errorHandler());
});


// Setup routes
app.use( app.router );
require('./app/routes')(app);


server = http.createServer(app).listen( process.env.PORT || config.port);
console.log((new Date()).toString()+ ":: glasstasks server listening on port::", server.address().port, ", environment:: ", app.settings.env);


//function start(){
    //server = http.createServer(app).listen( process.env.PORT || config.port);
    //logger.info((new Date()).toString()+ ":: glasstasks server listening on port::", server.address().port, ", environment:: ", app.settings.env);
//}

//exports.start = start;
//exports.app = app;
