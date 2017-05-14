import getPerformanceTimeBetween from './common/getPerformanceTimeBetween';

export default (event, cb) => getPerformanceTimeBetween('navigationStart', event, cb)