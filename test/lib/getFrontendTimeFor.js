import getFrontendTimeFor from '../../lib/getFrontendTimeFor';

describe('The getFrontendTimeFor method', () => {
  it('should return correctly the event timing', (done) => {
    getFrontendTimeFor('responseEnd', (t) => {
      expect(t).toBe(window.performance.timing.responseEnd - window.performance.timing.navigationStart);
      done();
    });
  });
});