var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
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