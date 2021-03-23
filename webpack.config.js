const path = require('path')

const HtmlWPP = require('html-webpack-plugin')
const refreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopement = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: isDevelopement ? 'development' : 'production',
    devtool: isDevelopement ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
        new HtmlWPP({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        isDevelopement && new refreshPlugin()
    ].filter(Boolean),
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        hot: true,
    },
    module: {
       rules: [
           {
               test: /\.(j|t)sx$/,
               exclude: /node_modules/,
               use: {
                   loader: 'babel-loader',
                   options: {
                       plugins: [
                           isDevelopement && require.resolve('react-refresh/babel')
                       ].filter(Boolean)
                   }
               }
           },
           {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'sass-loader']
           }
        ], 
    }
}