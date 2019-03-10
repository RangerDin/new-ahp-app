const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function(webpackEnv, argv) {
    const isEnvProduction = argv.mode === 'production';

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js'
        },
        devServer: {
            hot: true,
            port: 3000
        },
        devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',
        mode: isEnvProduction ? 'production' : 'development',
        optimization: {
            minimizer: [new OptimizeCSSAssetsPlugin({})]
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-proposal-object-rest-spread'
                            ]
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        isEnvProduction
                            ? MiniCssExtractPlugin.loader
                            : {
                                  loader: 'style-loader',
                                  options: { sourceMap: true, hmr: true }
                              },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: isEnvProduction ? '[name].[hash].css' : '[name].css'
            })
        ]
    };
};
