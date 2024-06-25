const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function getStyleLoader(pre) {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
              {
                // Options
              },
            ],
          ],
        },
      },
    },
    pre,
  ].filter(Boolean)
}

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      {
        oneOf: [
          {
            // css
            test: /\.css$/,
            use: getStyleLoader(),
          },
          {
            // SASS
            test: /\.scss$/,
            use: getStyleLoader('sass-loader'),
          },
          {
            // 图片
            test: /\.(png|jpe?g|gif|webp|svg)/i,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
          },
          {
            // 字体文件
            test: /\.(ttf|woff2?)$/i,
            type: 'asset/resource',
          },
          {
            // 其他资源
            test: /\.(mp3|mp4)$/i,
            type: 'asset/resource',
          },
          {
            // js
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  cacheCompression: false,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[fullhash:10].css',
      chunkFilename: 'css/[name]-[chunkhash:10].chunk.css',
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
  },
}
