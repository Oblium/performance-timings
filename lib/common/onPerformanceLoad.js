export default function onPerformanceLoad(cb) {
  if (window.performance.timing.loadEventEnd === 0) {
    return setTimeout(() => onPerformanceLoad(cb), 100);
  }
  return cb();
}