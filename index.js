'use strict';

var GulpUtil = require('gulp-util');
var Chalk = require('chalk');
var Table = require('cli-table');
var Nsp = require('nsp');

var rsGulp = function (params, callback) {

  var payload = {};
  var formatter = Nsp.formatters.default;

  if (params.package) {
    payload.package = params.package;
  }

  if (params.shrinkwrap) {
    payload.shrinkwrap = params.shrinkwrap;
  }

  if (params.output) {
    formatter = Nsp.formatters[params.output];
  }

  Nsp.check(payload, function (err, data) {

    var output = formatter(err, data);

    if (params.stopOnError === false || data.length === 0) {
      GulpUtil.log(output);
      return callback();
    }

    if (err) {
      return callback(output);
    }

    if (data.length > 0) {
      return callback(output);
    }

  });

};

module.exports = rsGulp;
