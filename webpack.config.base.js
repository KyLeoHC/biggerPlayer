const webpack = require('webpack');
let config = {
    entry: {
        player: './src/index'
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: () => {
                    return [
                        require('autoprefixer')
                    ];
                },
                babel: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }
        })
    ]
};

module.exports = config;