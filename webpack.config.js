var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: '/dist/'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      path.resolve('node_modules')
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9876
  },
  plugins: [new HtmlWebpackPlugin({
      title: 'Grid glass backdrop',
      filename: '../index.html'
    })],
  module: {
    rules: [
    {
      test: /\.jsx?$/, // both .js and .jsx
      loader: 'eslint-loader',
      include: path.resolve(__dirname, 'src'),
      enforce: 'pre',
      options: {
        fix: true,
      },
    },
    {
      test: /\.css$/,
      use: [
      'style-loader',
      'css-loader'
      ]
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    },
    {
      test: /\.svg$/,
      loader: 'svg-inline-loader?classPrefix'
    }

    ]
  },
  devtool: 'cheap-eval-source-map'
};