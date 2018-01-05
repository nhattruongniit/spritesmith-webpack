const path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        devtoolModuleFilenameTemplate: "./dist/[resource]"
    },
    devtool: 'cheap-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: true,
        port: 9000
    },
};