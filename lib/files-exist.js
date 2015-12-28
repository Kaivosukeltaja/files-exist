'use strict';

var glob = require('glob'),
    defaults = require('defaults'),

// Helper function by Yuriy Nemtsov
// hhttp://stackoverflow.com/a/2441972
stringToFunction = function(str) {
  var arr = str.split("."), fn, i, len = arr.length;
  if (typeof global != 'undefined') {
    fn = global;
  } else {
    fn = window;
  }

  for (i = 0; i < len; i++) {
    fn = fn[arr[i]];
  }

  if (typeof fn !== "function") {
    throw new Error("function not found");
  }

  return fn;
};

module.exports = function(fileArray, options) {
  options = defaults(options, {
    checkGlobs: false,
    throwOnMissing: true,
    exceptionClass: 'Error',
    exceptionMessage: 'A required file is missing'
  });

  return fileArray.filter(function(file) {
    var matches;
    if (glob.hasMagic(file) && options.checkGlobs === false) {
      return true;
    }

    // TODO: Check files asynchronously
    if (glob.sync(file).length == 0) {
      if (options.throwOnMissing) {
        throw stringToFunction(options.exceptionClass).call(this, options.exceptionMessage + ': ' + file);
      } else {
        return false;
      }
    } else {
      return true;
    }
  });
};