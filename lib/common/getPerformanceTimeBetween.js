import isPerformanceAvailable from './isPerformanceAvailable';
import onPerformanceLoad from './onPerformanceLoad';

export default (a, b, cb) => {
  if (isPerformanceAvailable()) {
    return onPerformanceLoad(() => cb(window.performance.timing[b] - window.performance.timing[a]));
  }

  return cb(-1);
}