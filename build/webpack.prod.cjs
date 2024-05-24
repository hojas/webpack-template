const path = require('node:path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const config = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name]-[hash:10].js',
    chunkFilename: 'js/[name]-[hash:10].chunk.js',
    assetModuleFilename: 'assets/[name]-[hash:10][ext]',
    clean: true,
  },
  devtool: 'source-map',
}

module.exports = merge(baseConfig, config)
