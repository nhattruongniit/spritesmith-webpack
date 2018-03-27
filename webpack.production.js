const path = require('path');

module.exports = {
    entry: {
        'farufaru.game': './src/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './public'),
        devtoolModuleFilenameTemplate: "./public/[resource]"
    },
    devtool: false,
    plugins:[],
    module: {
        rules: [
            {
                loader: "babel-loader",
          
                // Skip any files outside of your project's `src` directory
                include: [
                  path.resolve(__dirname, "src"),
                ],
          
                // Only run `.js` and `.jsx` files through Babel
                test: /\.jsx?$/,
          
                // Options to configure babel with
                query: {
                  plugins: ['transform-runtime'],
                  presets: ['es2015', 'stage-0'],
                }
            },
        ]
    }
};