import getTotalTime from '../../lib/getTotalTime';

describe('the library, when performance is not available', () => {
  it('should send back -1', (d) => {
    window.performance = undefined;
    getTotalTime(t => {
      expect(t).toBe(-1);
      d();
    })
  })
});