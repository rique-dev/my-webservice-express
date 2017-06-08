const loaders = require("./loaders");
const common = require('./common');
const path = require('path');
const fs = require('fs');

common.resolve.alias = {
    config: path.join(__dirname, '../src/config', 'develop.js')
};

module.exports = {
    entry: common.entry,
    output: common.output,
    resolve: common.resolve,
    target: "node",
    resolveLoader: {
        modulesDirectories: ["node_modules"]
    },
    module: {
        loaders: loaders
    },
};