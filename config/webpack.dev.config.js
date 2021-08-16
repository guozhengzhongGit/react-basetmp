const os = require('os');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const paths = require('./paths');

module.exports = {
  target: 'web',
  devtool: 'source-map',
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
        test: /\.[jt]sx?$/,
        include: paths.src,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: [/node_modules/],
        use: [
          {
            // 将 JS 字符串生成为 style 节点
            loader: 'style-loader',
          },
          {
            // 将 CSS 转化成 CommonJS 模块
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
                exportGlobals: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                localIdentContext: paths.src,
                localIdentHashSalt: 'webpack',
                namedExport: false,
                exportLocalsConvention: 'camelCase',
                exportOnlyLocals: false,
              },
            },
          },
          // 将 Sass 编译成 CSS
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        include: [/node_modules[\\/]antd/],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#13c2c2', // 全局主色
                  'link-color': '#13c2c2', // 链接色
                  'success-color': '#52c41a', // 成功色
                  'warning-color': '#fa8c16', // 警告色
                  'error-color': '#f5222d', // 错误色
                  'font-size-base': '14px', // 主字号
                },
                javascriptEnabled: true,
              },
            },
          },
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
    new WebpackBar({
      name: 'react-basecli',
      color: '#52c41a',
      profile: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  resolve: {
    alias: {
      '@$': paths.src,
      '@c$': paths.src + '/components',
      '@v$': paths.src + '/views',
      '@a$': paths.src + '/assets',
      Public$: paths.public,
    },
    extensions: ['.jsx', '.js', '.json'],
  },
  devServer: {
    contentBase: paths.dist,
    compress: true,
    port: 9080,
    open: true,
    hot: true,
  },
};
