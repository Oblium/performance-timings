import getPerformanceTimeBetween from './common/getPerformanceTimeBetween';

export default (event, cb) => getPerformanceTimeBetween('fetchStart', event, cb)