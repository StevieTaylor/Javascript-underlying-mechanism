const Path = require('path');
const HappyPack = require('happypack'); // 开启多个子线程并发执行
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', Path.resolve(__dirname, '../src/index.js')],
  output: {
    filename: 'main.[hash:8].js',
    path: Path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'], // 从右向左解析
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'happypack/loader?id=babel'
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.scss', '.json']
  },
  plugins: [
    new HappyPack({
      id: 'babel', // 与loader里的配置项对应
      threads: 4, // 配置子进程数
      loaders: ['babel-loader'] // 指定loader
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist']
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/template/index.html'),
      filename: 'index.html'
    })
  ]
};
