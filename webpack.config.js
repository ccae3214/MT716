const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js', // 你的入口檔案
    output: {
      path: path.resolve(__dirname, 'build'), // 輸出目錄
      filename: 'bundle.[contenthash].js', // 帶 hash 的檔案名
      clean: true, // 清除舊檔案
    },
    devServer: {
      port: 3000,
      hot: true, // 啟用熱重載
      open: true, // 自動打開瀏覽器
      historyApiFallback: true, // 支援 React Router
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html', // 你的 HTML 模板
      }),
      ...(isProduction ? [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })] : []),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };
};