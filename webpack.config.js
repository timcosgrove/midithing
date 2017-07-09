var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
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
  devtool: 'source-map'
};