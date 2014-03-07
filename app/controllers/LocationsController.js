"use strict";

var util = require('util'),
    _und = require('underscore'),
    cardHelper = require('../helpers/CardHelper'),
    LocationModel = require('../models/Location');

exports.listLocations = function(req, res, next) {
    req.app.locals.mirrorClient.listLocations(function(err, locations){
        if(err) return next('Error listing locations.');
        res.locals.locations = locations;
        //console.log("locations:" + util.inspect(locations));
        //res.locals.content = { locationNew: true };
        next();
    });
};

exports.getLocation = function(req, res, next){
    req.app.locals.mirrorClient.getLocation( req.params.id, function(err, location){
        if(err) return next('Error getting location by id: ' + req.params.id);
        res.locals.content = { locationUpdate: location };
        next();
    });
};

