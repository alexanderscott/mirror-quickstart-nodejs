"use strict";

// Handlebars helper for checking if an item is in an array
module.exports = function(item, arr, options){
    if(arr.indexOf(item) !== -1){
        return options.fn(this);
    } 
};
