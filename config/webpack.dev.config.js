const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = {
  mode: 'development',
  entry: {
    index: paths.src + '/entry.js',
  },
  output: {
    path: paths.dist,
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            // 将 JS 字符串生成为 style 节点
            loader: 'style-loader',
          },
          {
            // 将 CSS 转化成 CommonJS 模块
            loader: 'css-loader',
            options: {

            },
          },
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: 'asset',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: paths.public + '/index.html',
      filename: (entryName) => entryName + '.html',
    }),
  ],
  devServer: {
    contentBase: paths.dist,
    compress: true,
    port: 9080,
  },
};
