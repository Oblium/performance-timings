(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("lmnUiPerformances", [], factory);
	else if(typeof exports === 'object')
		exports["lmnUiPerformances"] = factory();
	else
		root["lmnUiPerformances"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

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

	    this._performaceObject = performance;
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

/***/ }
/******/ ])
});
;