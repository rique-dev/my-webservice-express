const path = require('path');
const webpack = require('webpack');
const OptimizeJsPlugin = require("optimize-js-plugin");
const UglifyEsPlugin = require('uglify-es-webpack-plugin');

module.exports = {
    entry: "./dist/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            modules: false,
                            targets: {
                                node: 8
                            }
                        }]
                    ]
                }
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'typeof window': '\"object\"',
            'window': 'global',
            '\"node_modules\/muri\/lib\"': '__dirname'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new OptimizeJsPlugin({
            sourceMap: false
        }),
        new UglifyEsPlugin(),
    ],
    performance: {
        hints: "warning",
        maxAssetSize: 200000,
        maxEntrypointSize: 400000,
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js');
        }
    },
    node: {
        __dirname: true,
        __filename: true
    },
    context: __dirname,
    target: "node",
    stats: "errors-only"
}
