const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const APP_DIR = path.resolve(__dirname, 'src');
const APP_DIR_CORE = path.resolve(__dirname, 'src/core');
const APP_DIST = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: APP_DIR + '/index.js',
  output: {
    filename: 'bundle.[hash].js',
    path: APP_DIST
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': APP_DIR,
      '@core': APP_DIR_CORE,
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: APP_DIR + '/index.html'
    }),
    new CopyPlugin([
      { from: APP_DIR + '/favicon.ico', to: APP_DIST }
    ]),
    new MiniCssExtractPlugin({
      filename: 'bundle.[hash].css'
    })
  ]
}