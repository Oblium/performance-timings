import lib from '../src/index';

describe('The library', () => {
  let libInstance;
  const fakePerformanceObject = {timing: {}};
  const now = +new Date();
  const fakeTiming = {
    navigationStart: now,
    fetchStart: now + 2,
    responseEnd: now + 10,
    loadEventEnd: now + 200
  };

  beforeEach(() => {
    jasmine.clock().install();
    resetPerformanceObject();
    libInstance = new lib(fakePerformanceObject);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  const setPerformanceObject = () => {
    fakePerformanceObject.timing.navigationStart = fakeTiming.navigationStart;
    fakePerformanceObject.timing.fetchStart = fakeTiming.fetchStart;
    fakePerformanceObject.timing.responseEnd = fakeTiming.responseEnd;
    fakePerformanceObject.timing.loadEventEnd = fakeTiming.loadEventEnd;
  };
  const resetPerformanceObject = () => {
    fakePerformanceObject.timing.navigationStart = 0;
    fakePerformanceObject.timing.fetchStart = 0;
    fakePerformanceObject.timing.responseEnd = 0;
    fakePerformanceObject.timing.loadEventEnd = 0;
  };

  it('should exist', () => {
    expect(lib).not.toBeUndefined();
  });

  it('should instantiate correctly', () => {
    expect(libInstance).not.toBeUndefined();
  });

  it('should not respond if it\'s not ready', () => {
    const spy = jasmine.createSpy('cb');
    libInstance.getPageLoad(spy);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call after it\'s ready', () => {
    const spy = jasmine.createSpy('cb');
    libInstance.getPageLoad(spy);
    expect(spy).not.toHaveBeenCalled();
    setPerformanceObject();

    jasmine.clock().tick(101);
    expect(spy).toHaveBeenCalled();
  });

  it('should call only after some time, decided by setPolling', () => {
    const spy = jasmine.createSpy('cb');
    libInstance.setPollingMs(1000);
    libInstance.getPageLoad(spy);
    setPerformanceObject();

    jasmine.clock().tick(500);
    expect(spy).not.toHaveBeenCalled();

    jasmine.clock().tick(901);
    expect(spy).toHaveBeenCalled();
  });

  describe('with a stubbed timing', () => {
    it('should return the correct net latency', () => {
      const spy = jasmine.createSpy('cb');
      setPerformanceObject();
      libInstance.getNetworkLatency(spy);

      expect(spy).toHaveBeenCalledWith(fakeTiming.responseEnd - fakeTiming.fetchStart);
    });

    it('should return the correct page load time', () => {
      const spy = jasmine.createSpy('cb');
      setPerformanceObject();
      libInstance.getPageLoad(spy);

      expect(spy).toHaveBeenCalledWith(fakeTiming.loadEventEnd - fakeTiming.responseEnd);
    });

    it('should return the correct total time', () => {
      const spy = jasmine.createSpy('cb');
      setPerformanceObject();
      libInstance.getTotalTime(spy);

      expect(spy).toHaveBeenCalledWith(fakeTiming.loadEventEnd - fakeTiming.navigationStart);
    });

    it('should return the correct json with timings', () => {
      const spy = jasmine.createSpy('cb');
      setPerformanceObject();
      libInstance.asJson(spy);

      expect(spy).toHaveBeenCalledWith({
        networkLatency: fakeTiming.responseEnd - fakeTiming.fetchStart,
        pageLoad: fakeTiming.loadEventEnd - fakeTiming.responseEnd,
        totalTime: fakeTiming.loadEventEnd - fakeTiming.navigationStart
      });
    })
  });

});