const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const paths = require('./paths');
const common = require('./webpack.common.config');
const CopyPlugin = require('copy-webpack-plugin');

const isAnalyzer = process.env.analyzer;

const prodPlugins = [
  new CopyPlugin({
    patterns: [
      {
        from: paths.public + '/font',
        to: paths.dist + '/font',
        toType: 'dir',
      },
    ],
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css',
  }),
];

if (isAnalyzer === 'true') {
  prodPlugins.push(
    new BundleAnalyzerPlugin({
      analyzerPort: 8099,
    })
  );
}

const prodConfig = () => {
  return merge(common, {
    devtool: 'source-map',
    mode: 'production',
    output: {
      path: paths.dist,
      publicPath: './',
      filename: '[name].[chunkhash].js',
      clean: true,
      pathinfo: false,
    },
    plugins: prodPlugins,
    module: {
      rules: [
        // 源码的样式文件
        {
          test: /\.s[ac]ss$/i,
          include: paths.src,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {},
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
          exclude: [
            /node_modules/,
            // /node_modules[\\/]braft-editor/,
            // /components[\\/]edit/,
            // /iconfont\.css$/,
          ],
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
          ],
        },
        // 依赖包中的样式
        {
          test: /\.less$/,
          include: [/node_modules[\\/]antd/],
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
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
        // {
        //   test: /\.css$/,
        //   include: [
        //     /node_modules[\\/]normalize\.css/,
        //     /node_modules[\\/]braft-editor/,
        //     /components[\\/]edit/,
        //     /iconfont\.css$/,
        //   ],
        //   use: [
        //     {
        //       loader: MiniCssExtractPlugin.loader,
        //     },
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         modules: false,
        //       },
        //     },
        //   ],
        // },
      ],
    },
  });
};

module.exports = prodConfig;
