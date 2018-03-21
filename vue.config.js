const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = {
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([
                {
                  from: path.resolve(__dirname, './src/data'),
                  to: 'data',
                  ignore: ['.*'],
                }
            ]),
        ]
    }
};
