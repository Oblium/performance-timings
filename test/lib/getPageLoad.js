import getPageLoad from '../../lib/getPageLoad';

describe('The getPageLoad method', () => {
  it('should return correctly the page load time', (done) => {
    getPageLoad((t) => {
      expect(t).toBe(window.performance.timing.loadEventEnd - window.performance.timing.responseEnd);
      done();
    });
  });
});