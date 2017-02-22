const webpack = require('webpack');
const path = require('path');
let baseConfig = require('./webpack.config.base');

baseConfig.output = {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: '[name].js'
};
baseConfig.module.rules.push({
    test: /\.css$/,
    use: [
        {loader: 'style-loader'},
        {loader: 'css-loader'},
        {loader: 'postcss-loader'}
    ]
});
baseConfig.devServer = {
    contentBase: './demo',
    host: '0.0.0.0',
    port: '8880'
};

module.exports = baseConfig;