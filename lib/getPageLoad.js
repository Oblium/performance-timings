import getPerformanceTimeBetween from './common/getPerformanceTimeBetween';

export default (cb) => getPerformanceTimeBetween('responseEnd', 'loadEventEnd', cb)