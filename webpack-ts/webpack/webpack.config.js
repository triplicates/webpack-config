let path                    = require('path'),
    HtmlWebpackPlugin       = require('html-webpack-plugin'),
    MiniCssExtractPlugin    = require('mini-css-extract-plugin'),
    CssMinimizerPlugin      = require('css-minimizer-webpack-plugin'),
    Autoprefixer            = require('autoprefixer'),
    {CleanWebpackPlugin}    = require('clean-webpack-plugin');

let { source,
      output,
      folders
    } = require('./webpack.config.json');  

const   MODE     = process.env.MODE,
        MODE_DEV = MODE === "development" ? true : false;

let webpackConfig =  {

    mode: process.env.MODE,
    entry: path.resolve(__dirname, "..", source),
    output: {
      filename: folders.js + output.filename,
      path: path.resolve(__dirname, "..", output.folder),
      publicPath: "/"
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        "@components":  path.resolve(__dirname, "..", "src/components"),
        "@styles":      path.resolve(__dirname, ".." , "src", folders.css),
        "@assets":      path.resolve(__dirname, ".." , "src", folders.assets),
        "@img":         path.resolve(__dirname, ".." , "src", folders.images)
      }
    },
    target: "web",
    optimization: {
      runtimeChunk: {
        name: 'runtime',
      },
      splitChunks: {
        chunks: "all"
      }
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, "..", "src/"),
      hot: true,
      inline: true,
      port: 8080
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/i,
                use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
      
                        {
                            loader: 'css-loader'
                        },
      
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [Autoprefixer]
                                }
                            }
                        }
                     ],
              },
              {
                test: /\.s[ac]ss$/i,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                  },
                  {
                    loader: "css-loader"
                  },
                  {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [Autoprefixer]
                        }
                    }
                  },
                  {
                    loader: "sass-loader"
                  }
                ],
              },
              {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: "file-loader",
                options: {
                  name: '[name].[ext]',
                  outputPath: folders.images
                },
              },
              {
                test: /\.(ttf|woff|woff2|eot)$/i,
                loader: "file-loader",
                options: {
                  name: '[name].[ext]',
                  outputPath: folders.fonts
                },
              },
              {
                test: /\.xml$/i,
                loader: "xml-loader"
              }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "..", "src/index.html"),
            minify: false,
            publicPath: "./"
        }),
        new MiniCssExtractPlugin({
            filename: MODE_DEV ? folders.css + "[name].css" : folders.css + "[contenthash:12].bundle.min.css"
        }),
        new CleanWebpackPlugin(),
    ],
}

if(!MODE_DEV){
    webpackConfig.plugins.push(new CssMinimizerPlugin())
}

module.exports = webpackConfig