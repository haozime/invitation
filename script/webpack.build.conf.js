const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// const Manifest = require('webpack-manifest')
const pkg = require('../package')
const base = require('./webpack.base.conf')

module.exports = merge(base, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'assets/main.[hash:7].js'
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    new CopyWebpackPlugin([{
      from: 'src'
    }], {
      ignore: ['*.ts', '*.styl']
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false,
      parallel: true
    }),

    new ExtractTextPlugin({
      filename: `assets/[name].[contenthash:7].css`,
      allChunks: false
    }),

    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true }
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        sortAttributes: true
      },
      chunksSortMode: 'dependency',
      inlineSource: '.(js|css)$' // embed all javascript and css inline
    }),

    new HtmlWebpackInlineSourcePlugin(),

    // new Manifest({
    //   cache: [
    //     // 'assets/main.[hash:7].js',
    //     // 'assets/main.[contenthash:7].css'
    //   ],
    //   timestamp: false,
    //   filename: 'cache.manifest',
    //   // 注意*星号前面用空格隔开
    //   network: [
    //     '*'
    //   ],
    //   // // 注意中间用空格隔开
    //   // fallback: ['/ /404.html'],
    //   headcomment: pkg.name + ' v' + pkg.version,
    //   master: ['index.html']
    // })
  ]
})
