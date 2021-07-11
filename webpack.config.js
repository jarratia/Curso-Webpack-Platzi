const path = require('path')
const HtmlWebpackPLugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const DotEnv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    //Punto de entrada de la aplicación.
    entry: './src/index.js',
    //Hacia donde vamos a enivar lo que prepara webpack
    output: {
        path: path.resolve(__dirname, 'dist'),
        //Asignamos el nombre al documento una vez procesado y configurado
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    //Con qué extensiones trabajamos en el proyecto
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
    module: {
        //Establecemos rules para las reglas
        //Reglas para establecer cómo se trabaja con archivos del proyecto
        rules: [
            {
                test: /\.m?js$/,
                //Excluimos los node modules
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(sass|less|css|styl)$/,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        name: '[name].[contenthash].[ext]',
                        outputPath: './assets/fonts/',
                        publicPath: '../assets/fonts/',
                        esModule: false
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPLugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new DotEnv(),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }

}