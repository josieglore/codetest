const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'webpack-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react', '@babel/env'],
          },
        },
      },
      {
        test: /\.css$/,
        use:
          process.env.NODE_ENV === 'production'
            ? [MiniCssExtractPlugin.loader, 'css-loader']
            : ['style-loader', 'css-loader'],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    publicPath: '/build/',
    // contentBase: path.join(__dirname, 'build/'),
    compress: true,
    port: 8080,
  },
};
