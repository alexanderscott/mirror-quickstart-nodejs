"use strict";

var _und = require('underscore'),
    defaultConfig = require('./default'),
    overrideConfig = require('./' + (process.env.NODE_ENV || 'development') );

// Extend environment-specific config onto default config
module.exports = _und.extend( defaultConfig, overrideConfig );
