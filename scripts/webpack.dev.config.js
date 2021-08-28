const { merge } = require('webpack-merge');
// const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const paths = require('./paths');
const common = require('./webpack.common.config');

const devConfig = () => {
  return merge(common, {
    devtool: 'source-map',
    mode: 'development',
    output: {
      path: paths.dist,
      publicPath: '/',
      filename: '[name].bundle.js',
      chunkFilename: '[id].bundle.js',
      clean: true,
      pathinfo: false,
    },
    plugins: [new ReactRefreshWebpackPlugin()],
    devServer: {
      compress: true,
      hot: true,
      open: true,
      port: 9080,
      historyApiFallback: true,
      // proxy: {
      //   '/api': {
      //     target: 'https://www.landluck.cn/react-ant-admin-api',
      //     pathRewrite: { '^/api': '' },
      //     secure: false,
      //   },
      // },
      client: {
        progress: true,
      },
      static: {
        directory: paths.dist,
        publicPath: '/',
      },
    },
    module: {
      rules: [
        // 源码中的样式文件
        {
          test: /\.s[ac]ss$/i,
          include: paths.src,
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
          test: /\.css$/,
          exclude: [/node_modules/],
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
          ],
        },
        // 依赖包中的样式文件
        {
          test: /\.less$/,
          include: [
            /node_modules[\\/]antd/,
            // /node_modules/
            // /node_modules[\\/]normalize\.css/,
            // /node_modules[\\/]braft-editor/,
            // /components[\\/]edit/,
            // /iconfont\.css$/,
          ],
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
          test: /\.css$/,
          include: [
            /node_modules[\\/]normalize\.css/,
            /node_modules[\\/]braft-editor/,
            /components[\\/]edit/,
            /iconfont\.css$/,
          ],
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
          ],
        },
      ],
    },
  });
};

module.exports = devConfig;
