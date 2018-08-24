const path = require('path');
const merge     = require('webpack-merge');
const shared    = require('./webpack.shared.js');
const configs    = require('./configs.js');

module.exports = configs.map(config => {
    return merge(shared(config), {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            host: '0.0.0.0',
            index: 'full.html',
            inline: false,
            port: 9000
        }
    });
});