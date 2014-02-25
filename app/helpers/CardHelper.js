"use strict";


// Generates a glass map image HTML string based on hash key-value pairs
exports.mapHtmlStr = function(opts){
    opts = opts || {};

    var paramStr = '?';
    for( var i = 0; i < Object.keys(opts).length; i++ ){
        paramStr += ( Object.keys(opts)[i] + '=' + opts[Object.keys(opts)[i]] + '&' );
    }
    return '<img src="glass://map' + encodeURIComponent(paramStr) + '" height="'+(opts.h || opts.height)+'" width="'+(opts.w || opts.width)+'">';
};
