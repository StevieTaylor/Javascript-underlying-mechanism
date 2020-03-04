const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill", path.resolve(__dirname, '../src/index.js')],
    output: {
        filename: "main.[hash:8].js",
        path: path.resolve(__dirname, "../dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/template/index.html'),
            filename: 'home.html'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: '../dist'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'], // 从右向左解析
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
}