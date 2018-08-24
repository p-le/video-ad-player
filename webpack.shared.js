const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (config) => ({
    entry: {
        'tag': path.resolve(__dirname, `${config.baseDir}/index.js`)
    },
    output: {
        filename: config.outputFileName,
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: config.title,
            filename: config.htmlFileName,
            template: `${config.baseDir}/index.html`
        })
    ]
});