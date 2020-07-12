const webpack = require('webpack');

const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const APP_DIR = path.resolve(__dirname, 'src');
const APP_DIR_CORE = path.resolve(__dirname, 'src/core');
const APP_DIST = path.resolve(__dirname, 'dist');
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const fileName = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const jsLoader = () => {
  const loaders = ['babel-loader'];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', APP_DIR + '/index.js'],
  output: {
    filename: fileName('js'),
    path: APP_DIST,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': APP_DIR,
      '@core': APP_DIR_CORE,
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: isDev,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: APP_DIR + '/index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: APP_DIR + '/favicon.ico',
          to: APP_DIST,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: fileName('css'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoader(),
      },
    ],
  },
};
