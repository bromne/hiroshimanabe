const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// CopyWebpackPlugin のファイル数制限を回避します
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        bundle: './app.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new CopyWebpackPlugin([
            'assets',
            'data',
            'index.html'
        ].map(function (path) {
            return { from: path, to: path };
        }))
    ],
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ],
        loaders: [
            { test : /\.(?:html|ico|json|png)/, loader: "file" }
        ]
    }
};
