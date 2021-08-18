const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const WebpackBar = require('webpackbar');
const paths = require('./paths');
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
module.exports = {
  target: 'web',
  entry: {
    index: paths.src + '/entry.js',
  },
  plugins: [
    new DashboardPlugin(),
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
  ],
  resolve: {
    alias: {
      '@': paths.src,
      '@c': paths.src + '/components',
      '@v': paths.src + '/views',
      '@a': paths.src + '/assets',
      Public: paths.public,
    },
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: paths.src,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins:
                process.env.NODE_ENV === 'development'
                  ? [require.resolve('react-refresh/babel')].filter(Boolean)
                  : [],
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
};
