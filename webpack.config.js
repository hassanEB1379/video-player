const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    devtool:'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 9000,
        open: true,
        server: {
            type: 'https',
            options: {
                key: './localhost-key.pem',
                cert: './localhost.pem',
            },
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    }
                    ,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1
                        }
                    },
                ],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    optimization: {},
};