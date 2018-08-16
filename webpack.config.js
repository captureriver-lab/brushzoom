const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');


module.exports = {
  mode: 'development',
  target: 'node',
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  externals: nodeExternals(),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
      },
      {
         test: /\.(gif|png|jpg)$/,
         use: [ 'file-loader' ]
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }

    ]
  }
}
