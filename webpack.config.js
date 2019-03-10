const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function(webpackEnv, argv) {
    const isEnvProduction = argv.mode === "production";

    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "bundle.js"
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html"
            })
        ],
        devServer: {
            hot: true,
            port: 3000
        },
        devtool: isEnvProduction ? "source-map" : "cheap-module-source-map",
        mode: isEnvProduction ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ],
                            plugins: [
                                "@babel/plugin-proposal-object-rest-spread"
                            ]
                        }
                    }
                }
            ]
        }
    };
};
