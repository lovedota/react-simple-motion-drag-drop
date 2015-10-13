var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: ['babel-core/polyfill', './main.tsx'],
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    alias: {
      '@libs': path.join(__dirname, 'libs')
    }
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'scripts.js'
  },
  module: {
     preLoaders: [
      {
          test: /\.ts$/,
          loader: "tslint-loader"
      }
    ],
    loaders: [
      {
        test: /\.ts(x?)$/,
        loader: 'babel-loader!ts-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!autoprefixer-loader?{browsers:["last 2 version", "Firefox 15"]}!sass-loader?includePaths[]='
            + path.resolve(__dirname, './node_modules'))
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /bootstrap[^\.]+.js$/,
        loader: 'imports?jQuery=jquery,$=jquery',
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ],
  debug: true,
  devtool: 'inline-source-map'
};
