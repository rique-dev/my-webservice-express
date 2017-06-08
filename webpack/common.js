module.exports.entry = "./src/index.ts";

module.exports.output = {
    path: 'build',
    filename: "index.js",
};
module.exports.resolve = {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json']
};