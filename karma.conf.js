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
    reporters: ['spec', 'threshold'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    autoWatchBatchDelay: 300,


    files: [
      './test/**/*.js'
    ],

    preprocessors: {
      './src/index.js': ['webpack', 'coverage'],
      './lib/**/*.js': ['webpack', 'coverage'],
      './test/**/*.js': ['babel', 'webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    thresholdReporter: {
      statements: 80,
      branches: 75,
      functions: 75,
      lines: 80
    },
    specReporter: {
      suppressSkipped: true
    }
  });
};