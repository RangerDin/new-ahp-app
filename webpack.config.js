const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = function(webpackEnv, argv) {
    const isEnvProduction = argv.mode === 'production';

    return {
        'entry': './src/index.jsx',
        'output': {
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
            filename: 'bundle.js',
        },
        'devServer': {
            hot: true,
            historyApiFallback: {
                index: '/',
            },
            port: 3000,
        },
        'devtool': isEnvProduction ? 'source-map' : 'cheap-module-source-map',
        'mode': isEnvProduction ? 'production' : 'development',
        'resolve': {
            'modules': ['./src', 'node_modules'],
            'extensions': ['.js', '.jsx'],
            'alias': {
                'react': 'preact/compat',
                'react-dom': 'preact/compat',
            },
        },
        'optimization': {
            minimize: isEnvProduction,
            minimizer: [
                new TerserWebpackPlugin({
                    terserOptions: {
                        parse: {
                            // we want terser to parse ecma 8 code. However, we don't want it
                            // to apply any minfication steps that turns valid ecma 5 code
                            // into invalid ecma 5 code. This is why the 'compress' and 'output'
                            // sections only apply transformations that are ecma 5 safe
                            // https://github.com/facebook/create-react-app/pull/4234
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            // Disabled because of an issue with Uglify breaking seemingly valid code:
                            // https://github.com/facebook/create-react-app/issues/2376
                            // Pending further investigation:
                            // https://github.com/mishoo/UglifyJS2/issues/2011
                            comparisons: false,
                            // Disabled because of an issue with Terser breaking valid code:
                            // https://github.com/facebook/create-react-app/issues/5250
                            // Pending futher investigation:
                            // https://github.com/terser-js/terser/issues/120
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            // Turned on because emoji and regex is not minified properly using default
                            // https://github.com/facebook/create-react-app/issues/2488
                            ascii_only: true,
                        },
                    },
                    // Use multi-process parallel running to improve the build speed
                    // Default number of concurrent runs: os.cpus().length - 1
                    parallel: true,
                    // Enable file caching
                    cache: true,
                    sourceMap: true,
                }),
                new OptimizeCSSAssetsPlugin({}),
            ],
        },
        'module': {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                            ],
                            plugins: [
                                '@babel/plugin-proposal-object-rest-spread',
                            ],
                        },
                    },
                },
                {
                    test: /\.scss$/,
                    use: [
                        isEnvProduction
                            ? MiniCssExtractPlugin.loader
                            : {
                                loader: 'style-loader',
                                options: {sourceMap: true, hmr: true},
                            },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                localIdentName: isEnvProduction
                                    ? '[hash:base64]'
                                    : '[local]--[hash:base64:5]',
                            },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {loader: 'sass-loader', options: {sourceMap: true}},
                    ],
                },
            ],
        },
        'plugins': [
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new MiniCssExtractPlugin({
                filename: isEnvProduction ? '[name].[hash].css' : '[name].css',
            }),
        ],

    };
};
