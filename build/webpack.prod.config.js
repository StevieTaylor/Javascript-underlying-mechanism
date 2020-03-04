const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const production = {
  mode: 'production',
  plugins: [
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        mangle: false, // 是否混淆代码
        output: {
          beautify: false, // 代码压缩成一行 true为不压缩 false压缩
          comments: false // 是否去掉注释
        },
        compress: {
          drop_console: true, // 删除console
          collapse_vars: true, //  把定义一次的变量，直接使用，取消定义变量
          reduce_vars: true // 合并多次用到的值，定义成变量
        }
      }
    })
  ]
};

module.exports = merge(base, production);
