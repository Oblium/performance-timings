# PERFORMANCES

## Description
A simple wrapper for [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timing)

## Usage
Basic usage is:

1. Import the library from 'performances'
  - `import Performances from 'performances'`;
2. Instantiate the Performances object providing the window.performance object and invoke the method you want to use on it
  - `var perf = new Performances(window.performance);`
  - `perf.getTotalTime(time => /* do stuffs with time */)`;
3. You can use also the asJson method to get all info together:
  - `perf.asJson(timeData => /*do stuffs with timeData*/)`
  - The method will provide an object with networkLatency, pageLoad and totalTime keys

Additionaly you can import single methods to have a lower impact on your bundle size:

1. Import single methods you want to use
  - `import getTotalTime from 'performances/lib/getTotalTime';`
2. Call the method providing the callback to call on retrieve
  - `getTotalTime(time => /*do stuffs with time*/);`

Note: using the single methods implies a compilation of the imported code. 

## Available methods
- getPageLoad
- getNetworkLatency
- getTotalTime