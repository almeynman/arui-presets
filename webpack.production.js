const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const postcssConfigPath = path.resolve(__dirname, './postcss.config.js');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader?config=' + postcssConfigPath),
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            sourceMap: false,
            warnings: false
        }),
        new ExtractTextPlugin('[name].[hash].css'),
        new CompressionPlugin({
            asset: '[file].gz',
            algorithm: 'gzip',
            regExp: /\.js$|\.css$|\.ttf$|\.svg$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
};
