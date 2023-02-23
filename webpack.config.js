const HtmlWebpackPlugin = require('html-webpack-plugin')
    
module.exports = {
    context: __dirname,
    entry: './index.js',
    output: {
    publicPath: '',
    filename: 'bundle.js'
    },
    module: {
    rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.png$/, type: 'asset/resource' }
    ]
    },
    plugins: [
    new HtmlWebpackPlugin({
        minify: false
    })
    ]
    };