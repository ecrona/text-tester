var path = require('path');
var webpack = require('webpack');

var config = {
    entry: ['./src/app.tsx'],
    output: {
        path: path.resolve(__dirname, 'public-dev/js'),
        filename: 'bundle.js'
    },
    devtool: "source-map",
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.d.ts', '.ts', '.tsx', '.js'],
        alias: {
//            'react': path.resolve(__dirname, './node_modules/react/dist/react.js'),
//            'react-dom': path.resolve(__dirname, './node_modules/react-dom/dist/react-dom.js')
        }
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
    }
};

module.exports = config;