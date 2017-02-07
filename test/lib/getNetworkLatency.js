import getNetworkLatency from '../../lib/getNetworkLatency';

describe('The getNetworkLatency method', () => {
  it('should return correctly the network latency', (done) => {
    getNetworkLatency((t) => {
      expect(t).toBe(window.performance.timing.responseEnd - window.performance.timing.fetchStart);
      done();
    });
  });
});