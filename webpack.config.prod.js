var path = require('path');
var webpack = require('webpack');
var saveLicense = require('uglify-save-license');

var config = {
    entry: ['./src/app.tsx'],
    output: {
        path: path.resolve(__dirname, 'public-dev/js'),
        filename: 'bundle.js'
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.d.ts', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }],
        noParse: /validate\.js/
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: saveLicense
            }
        })
    ]
};

module.exports = config;