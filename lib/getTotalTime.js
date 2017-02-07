import getPerformanceTimeBetween from './common/getPerformanceTimeBetween';

export default (cb) => getPerformanceTimeBetween('navigationStart', 'loadEventEnd', cb)