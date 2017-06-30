const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        publicPath: '/built/',
        path: path.resolve(__dirname, 'dist', 'built')
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        publicPath: '/built/',
        contentBase: [
            path.join(__dirname, 'dist'),
        ],
        historyApiFallback: true,
        compress: true,
        port: 8080
    }
}