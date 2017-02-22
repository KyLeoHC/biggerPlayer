const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.config.base');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

baseConfig.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js'
};
baseConfig.module.rules.push({
    test: /\.css$/,
    use: ExtractTextPlugin.extract(['css-loader', 'postcss-loader'])
});
baseConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new ExtractTextPlugin('[name].css')
);

module.exports = baseConfig;