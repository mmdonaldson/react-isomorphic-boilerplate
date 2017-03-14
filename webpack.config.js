const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/main.js'),
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
  },
  plugins: [
    require('autoprefixer'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json?$/,
        loader: 'json',
      },
      {
        test: /(\.css|\.less)$/,
        loaders: ['style-loader', 'css-loader?sourceMap', 'less-loader?sourceMap'],
      },
      {
        test: /\.svg/,
        loader: 'url-loader?mimetype=image/svg+xml',
      },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png',
      },
      {
        test: /\.jpg/,
        loader: 'url-loader?mimetype=image/jpeg',
      },
      {
        test: /\.gif/,
        loader: 'url-loader?mimetype=image/gif',
      },
      {
        test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
};
