const path = require('path');
const webpackConfig = require('./webpack.config');
webpackConfig.entry = {};
webpackConfig.isparta = {
  embedSource: true,
  noAutoWrap: true,
  babel: {
    presets: ['es2015']
  }
};
webpackConfig.module.preLoaders = [{
  test: /\.js$/,
  include: [path.resolve('./src'), path.resolve('./lib')],
  loader: 'isparta'
}];

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeCanaryHeadless'],
    singleRun: true,
    autoWatchBatchDelay: 300,


    files: [
      './test/**/*.js'
    ],

    preprocessors: {
      './test/**/*.js': ['babel', 'webpack']
    },

    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            use: [{loader: 'babel-loader'}]
          },
          {
            test: /\.js$/,
            include: [path.resolve('src'), path.resolve('lib')],
            loader: 'istanbul-instrumenter-loader',
            options: {
              esModules: true
            }
          }
        ]
      }
    },

    webpackMiddleware: {
      noInfo: true
    },
    coverageIstanbulReporter: {
      reports: ['text-summary', 'html', 'lcov'],
      fixWebpackSourcePaths: true,
      dir: 'target/'
    },
    thresholdReporter: {
      statements: 80,
      branches: 75,
      functions: 75,
      lines: 80
    },
    specReporter: {
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true,
      failFast: false
    }
  });
};