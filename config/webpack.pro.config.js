const paths = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(process.env.NODE_ENV);
module.exports = (opts) => {
  console.log(opts);
  return {
    mode: 'production',
    entry: {
      index: paths.src + '/entry.js',
    },
    output: {
      path: paths.dist,
      filename: '[name].[chunkhash].js',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: paths.public + '/index.html',
        filename: (entryName) => entryName + '.html',
      }),
    ],
  };
};
