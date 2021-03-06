const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function webpackProductionConfigBuilder(options) {
    options = options || {};
    const extractMainCSS = new ExtractTextPlugin(options.extractMainCSS || '[name].[hash].css');
    const extractIconsCSS = new ExtractTextPlugin(options.extractIconsCSS || '[name]-icons.[hash].css');
    const extractOptions = Object.assign({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader']
    }, options.extractOptions);

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    exclude: /icon.*\.css$/,
                    use: extractMainCSS.extract(extractOptions)
                },
                {
                    test: /icon.*\.css$/,
                    use: extractIconsCSS.extract(extractOptions)
                }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks(module) {
                    return module.userRequest
                        && (module.userRequest.indexOf('arui') === -1 || module.userRequest.indexOf('polyfills') !== -1)
                        && module.userRequest.indexOf('node_modules') !== -1;
                }
            }),
            new ManifestPlugin(),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                sourceMap: false,
                warnings: false
            }),
            extractMainCSS,
            extractIconsCSS,
            new OptimizeCssAssetsPlugin(),
            new CompressionPlugin({
                asset: '[file].gz',
                algorithm: 'gzip',
                regExp: /\.js$|\.css$|\.png$|\.svg$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    };
}

module.exports = webpackProductionConfigBuilder;
