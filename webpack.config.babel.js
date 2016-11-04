import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'babel-polyfill',
    './src/index',
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: path.join(__dirname, 'node_modules'),
    },
    {
      test: /\.css$/,
      loader: 'style!css!postcss',
    },
    {
      test: /\.json$/,
      loader: 'json',
    },
    {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'file-loader',
    }],
  },
  postcss: () => [
    require('autoprefixer'),
    require('postcss-normalize'),
    require('postcss-nested'),
    require('postcss-banks-db'),
    require('postcss-contrast'),
  ],
};
