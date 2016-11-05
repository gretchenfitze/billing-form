import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
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
      loader: 'file',
    }],
  },
};
