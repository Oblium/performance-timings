import getPerformanceTimeBetween from './common/getPerformanceTimeBetween';

export default (cb) => getPerformanceTimeBetween('fetchStart', 'responseEnd', cb)