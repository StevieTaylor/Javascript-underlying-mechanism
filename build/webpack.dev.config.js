const path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

const development = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'), // 静态文件地址
    port: 4200,
    host: 'localhost',
    stats: 'errors-only', // 只打印错误信息
    compress: false, // 服务器返回浏览器的时候是否启动gzip压缩
    open: true // 自动打开浏览器
    // overlay: true, // 如果出错，则在浏览器中显示出错误
    // hot: true, // 模块热替换，需要webpack.HotModuleReplacementPlugin插件
    // inline: true, // 实时构建,
    // progress: false, // 显示打包进度
  },
  devtool: 'inline-source-map', // 生成代码映射，查看编译前代码，利于找bug
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin() // 显示模块的相对路径
  ]
};

module.exports = merge(base, development);
