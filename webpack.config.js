const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const production = process.env.NODE_ENV === 'production' ? require('./webpack.production') : {};
console.log(require('./webpack.production'));

module.exports = Object.assign({
    entry: {
        'kingdom.dev': './src/dev.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './static'),
        devtoolModuleFilenameTemplate: "./static/[resource]"
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, './static'),
        compress: true,
        //host: '0.0.0.0',
        port: 8000
    },

    module: {

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('src', 'index.html')
        })
    ],

    resolve: {
        alias: {
            'farufaru-config': path.resolve(__dirname, './src/config')
        }
    },
    externals: [{
        'pixi.js': 'PIXI',
        'gsap': 'window'
    }, ],
}, production);