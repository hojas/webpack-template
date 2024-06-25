const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const config = {
  mode: 'development',
  output: {
    filename: 'js/[name]-[fullhash:10].js',
    chunkFilename: 'js/[name]-[chunkhash:10].chunk.js',
    assetModuleFilename: 'assets/[name]-[fullhash:10][ext]',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
  },
}

module.exports = merge(baseConfig, config)
