let webpack = require("webpack");
let path = require('path');

module.exports = {
    entry: {
        app: ["./src/app.tsx"],
        vendor: [
            "./node_modules/jquery/dist/jquery.min.js",
            "materialize-css/dist/js/materialize.js",
            "react",
            "react-dom",
            "react-router-dom",
            "js-joda",
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.bundle.js" })
    ],
    externals: [
        {
            // "jquery": "jQuery",
            // "materialize-css/dist/js/materialize.js": true
        }
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
                loader: "awesome-typescript-loader",
                // query: {
                //     presets: ["es2015"]
                // }
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },

            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ],
        loaders: [
        ]
    },
    stats: { errorDetails: true }
};

