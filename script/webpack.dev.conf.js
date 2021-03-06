const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.base.conf')

module.exports = merge(base, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    host: '0.0.0.0',
    port: 2562,
    open: true,
    openPage: '?id=6ICX5a2Q',
    overlay: {
      warnings: false,
      errors: true
    },
    publicPath: '/',
    quiet: true,
    watchOptions: {
      poll: false
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    })
  ]
})
