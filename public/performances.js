(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("performances", [], factory);
	else if(typeof exports === 'object')
		exports["performances"] = factory();
	else
		root["performances"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NOT_AVAILABLE_VALUE = -1;
var DEFAULT_POLLING_MS = 100;

var Timings = function () {
  function Timings(performance) {
    _classCallCheck(this, Timings);

    this._performaceObject = performance || window.performance;
    this._pollingMs = DEFAULT_POLLING_MS;
  }

  _createClass(Timings, [{
    key: 'isAvailable',
    value: function isAvailable() {
      return typeof this._performaceObject !== 'undefined';
    }
  }, {
    key: '_onLoad',
    value: function _onLoad(cb) {
      var _this = this;

      if (this._performaceObject.timing.loadEventEnd) {
        cb();
      } else {
        setTimeout(function () {
          return _this._onLoad(cb);
        }, this._pollingMs);
      }
    }
  }, {
    key: 'setPollingMs',
    value: function setPollingMs(ms) {
      this._pollingMs = ms;
    }
  }, {
    key: 'getPageLoad',
    value: function getPageLoad(cb) {
      var _this2 = this;

      return this._checkAvailability(function () {
        return cb(_this2._diffBetween('loadEventEnd', 'responseEnd'));
      });
    }
  }, {
    key: 'getNetworkLatency',
    value: function getNetworkLatency(cb) {
      var _this3 = this;

      return this._checkAvailability(function () {
        return cb(_this3._diffBetween('responseEnd', 'fetchStart'));
      });
    }
  }, {
    key: 'getTotalTime',
    value: function getTotalTime(cb) {
      var _this4 = this;

      return this._checkAvailability(function () {
        return cb(_this4._diffBetween('loadEventEnd', 'navigationStart'));
      });
    }
  }, {
    key: 'asJson',
    value: function asJson(cb) {
      var _this5 = this;

      return this._checkAvailability(function () {
        return cb({
          networkLatency: _this5._diffBetween('responseEnd', 'fetchStart'),
          pageLoad: _this5._diffBetween('loadEventEnd', 'responseEnd'),
          totalTime: _this5._diffBetween('loadEventEnd', 'navigationStart')
        });
      }, 0);
    }
  }, {
    key: '_diffBetween',
    value: function _diffBetween(a, b) {
      return this._performaceObject.timing[a] - this._performaceObject.timing[b];
    }
  }, {
    key: '_checkAvailability',
    value: function _checkAvailability(cb) {
      var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NOT_AVAILABLE_VALUE;

      return this.isAvailable() ? this._onLoad(cb) : cb(def);
    }
  }]);

  return Timings;
}();

exports.default = Timings;

/***/ })
/******/ ]);
});