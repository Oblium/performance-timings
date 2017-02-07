const project = require('./package.json');
const webpack = require('webpack');
const params = require('minimist')(process.argv.slice(2));


module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: './public',
    filename: project.name + '.js',
    library: "performances",
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel',
        exclude: /(node_modules)/
      }
    ]
  },
  devServer: {
    hot: true,
    port: 3333,
    contentBase: './public/'
  },
  plugins: params.production ? [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false}
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.DedupePlugin()
    ] : []
};