const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './examples/index.tsx',
    output: {
        filename: './dist/bundle.js',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Floaty examples'
        })
    ]
};
