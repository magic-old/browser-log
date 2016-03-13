'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _magicTypes = require('magic-types');

var logLevels = ['all', 'warnings', 'errors'];

var log = exports.log = function log() {
  var _console;

  return log.logLevel === 0 && (_console = console).log.apply(_console, arguments);
};

log.setLogLevel = function (_ref) {
  var logLevel = _ref.logLevel;

  if ((0, _magicTypes.isNumber)(logLevel)) {
    if (logLevels.length < logLevel) {
      log.setLogLevelError({ logLevel: logLevel });
      return;
    }

    log.logLevel = logLevels[logLevel];
  } else if ((0, _magicTypes.isString)(logLevel)) {
    var logLevelIndex = logLevels.indexOf(logLevel);

    if (logLevelIndex === -1) {
      log.setLogLevelError({ logLevel: logLevel });
      return;
    }

    log.logLevel = logLevelIndex;
  }
};

log.setLogLevelError = function (_ref2) {
  var logLevel = _ref2.logLevel;
  return log.error('logLevel', logLevel, 'does not exist');
};

log.warn = function () {
  var _console2;

  return log.logLevel >= 1 && (_console2 = console).warn.apply(_console2, arguments);
};

log.error = function () {
  var _console3;

  return (_console3 = console).error.apply(_console3, arguments);
};

log.success = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return log.logLevel === 0 && console.log('%c ' + _extends({}, args), 'color: green');
};

log.info = function () {
  return log.log.apply(log, arguments);
};

exports.default = log;
