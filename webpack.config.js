var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


var BUILD_DIR = path.resolve(__dirname, './');
var APP_DIR = path.resolve(__dirname, './');

var config = {
  entry: APP_DIR + '/js/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      include: APP_DIR,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loaders: ["style", "css"]
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};

module.exports = config;
