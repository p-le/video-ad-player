const merge     = require('webpack-merge');
const shared    = require('./webpack.shared.js');
const configs    = require('./configs.js');

module.exports = configs.map(config => {
    const sharedConfig = shared(config);

    return merge(sharedConfig, {
        mode: 'production',
    });
});