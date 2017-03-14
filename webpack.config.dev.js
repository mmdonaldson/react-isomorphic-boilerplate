var path = require('path');
var webpack = require('webpack');
var embedFileSize = 50000;

module.exports = {
  devtool: 'source-map',
  entry: [
    // 'webpack-hot-middleware/client',
    path.join(__dirname, 'src/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      { test: /(\.css|\.less)$/, loaders: ['style-loader', 'css-loader?sourceMap', 'less-loader?sourceMap'] },
      { test: /\.svg/,
        loader: 'url-loader?limit=' + embedFileSize + '&mimetype=image/svg+xml'
      },
      { test: /\.png$/,
        loader: 'url-loader?limit=' + embedFileSize + '&mimetype=image/png'
      },
      { test: /\.jpg/,
        loader: 'url-loader?limit=' + embedFileSize + '&mimetype=image/jpeg'
      },
      { test: /\.gif/,
        loader: 'url-loader?limit=' + embedFileSize + '&mimetype=image/gif'
      },
      {
        test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=' + embedFileSize
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
}
