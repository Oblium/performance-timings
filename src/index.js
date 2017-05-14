const NOT_AVAILABLE_VALUE = -1;
const DEFAULT_POLLING_MS = 100;

export default class Timings {
  constructor(performance) {
    this._performaceObject = performance || window.performance;
    this._pollingMs = DEFAULT_POLLING_MS;
  }

  isAvailable() {
    return typeof this._performaceObject !== 'undefined';
  }

  _onLoad(cb) {
    if (this._performaceObject.timing.loadEventEnd) {
      cb();
    } else {
      setTimeout(() => this._onLoad(cb), this._pollingMs);
    }
  }

  setPollingMs(ms) {
    this._pollingMs = ms;
  }

  getPageLoad(cb) {
    return this._checkAvailability(() => cb(this._diffBetween('loadEventEnd', 'responseEnd')));
  }

  getNetworkLatency(cb) {
    return this._checkAvailability(() => cb(this._diffBetween('responseEnd', 'fetchStart')));
  }

  getTotalTime(cb) {
    return this._checkAvailability(() => cb(this._diffBetween('loadEventEnd', 'navigationStart')));
  }

  getTimeFor(event, cb) {
    return this._checkAvailability(() => cb(this._diffBetween(event, 'fetchStart')));
  }

  getFrontendTimeFor(event, cb) {
    return this._checkAvailability(() => cb(this._diffBetween(event, 'navigationStart')));
  }

  asJson(cb) {
    return this._checkAvailability(() => cb({
      networkLatency: this._diffBetween('responseEnd', 'fetchStart'),
      pageLoad: this._diffBetween('loadEventEnd', 'responseEnd'),
      totalTime: this._diffBetween('loadEventEnd', 'navigationStart')
    }), 0);
  }

  _diffBetween(a, b) {
    return this._performaceObject.timing[a] - this._performaceObject.timing[b];
  }

  _checkAvailability(cb, def = NOT_AVAILABLE_VALUE) {
    return this.isAvailable() ? this._onLoad(cb) : cb(def);
  }
}

export const EVENTS = {

};