const project = require('./package.json');
const webpack = require('webpack');
const path = require('path');
const params = require('minimist')(process.argv.slice(2));


module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: project.name + '.js',
    library: "performances",
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        use: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  devServer: {
    hot: true,
    port: 3333,
    contentBase: './public/'
  },
  plugins: params.production ? [new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }), new webpack.optimize.UglifyJsPlugin({
    compress: {warnings: false},
    sourceMap: true
  }), new webpack.optimize.AggressiveMergingPlugin()] : []
};