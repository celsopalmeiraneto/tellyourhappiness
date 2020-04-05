const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './dist/index.js',
  target: 'node',
  optimization: {
    minimize: false
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
};