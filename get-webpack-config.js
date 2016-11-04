const path = require('path');
const webpack = require('webpack');

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ isProd = false, isWebpackDevServer = false, port } = {}) => ({
  devtool: 'source-map',
  entry: {
    [`app${isProd ? '.min' : ''}`]: (
      isWebpackDevServer ? [`webpack-dev-server/client?http://localhost:${port}`, 'webpack/hot/dev-server'] : []
    ).concat(path.join(__dirname, 'src', 'index.js'))
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: ''
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      __PROD__: JSON.stringify(isProd),
      __DEV__: JSON.stringify(!isProd),
      __DEVSERVER__: JSON.stringify(isWebpackDevServer),
      'process.env': {
        NODE_ENV: JSON.stringify(isProd ? 'production' : 'development')
      }
    }),
    new HtmlWebpackPlugin({
      minify: {},
      template: path.join(__dirname, 'src', 'index.html'),
      inject: 'head'
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
  .concat(isWebpackDevServer ? [
    // Webpack 1.0
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ] : [])
  .concat(isProd ? [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ] : []),
  module: {
    preLoaders: [
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2']
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2', 'react'].concat(isWebpackDevServer ? ['react-hmre'] : [])
        }
      }, {
        test: /\.css$/,
        loader: isWebpackDevServer ?
        'style!css'
        :
        ExtractTextPlugin.extract('style', 'css')
      }, {
        test: /\.font\.(js|json)$/,
        loader: isWebpackDevServer ?
        'style!css!fontgen' :
        // eslint-disable-next-line
        ExtractTextPlugin.extract('style', 'replace?flags=g&regex=\/font\/&sub=\.\/font\/!css!fontgen?fileName=./font/[hash][ext]')
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&name=./font/[hash].[ext]&mimetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&name=./font/[hash].[ext]'
      }, {
        test: /\.(gif|png)$/,
        loader: 'url?limit=10000&name=./asset/[hash].[ext]'
      }
    ]
  },
  resolve: {
    root: path.resolve(__dirname)
  }
});
