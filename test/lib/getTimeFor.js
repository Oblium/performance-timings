import getTimeFor from '../../lib/getTimeFor';

describe('The getTimeFor method', () => {
  it('should return correctly the event timing', (done) => {
    getTimeFor('responseEnd', (t) => {
      expect(t).toBe(window.performance.timing.responseEnd - window.performance.timing.fetchStart);
      done();
    });
  });
});