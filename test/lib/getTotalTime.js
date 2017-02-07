import getTotalTime from '../../lib/getTotalTime';

describe('The getTotalTime method', () => {
  it('should return correctly the total time', (done) => {
    getTotalTime((t) => {
      expect(t).toBe(window.performance.timing.loadEventEnd - window.performance.timing.navigationStart);
      done();
    });
  });
});