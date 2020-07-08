// require('@babel/register')({
//   // Ignore everything in node_modules.
//   ignore: [/node_modules/],
// })
import webpack, { Configuration } from 'webpack'
import path from 'path'
import { dependencies as externals } from '../package.json'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const commonConfig: Configuration = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contentHash].bundle.js',
    // https://github.com/webpack/webpack/issues/1114
    // libraryTarget: "commonjs2",
  },
  // externals: [...Object.keys(externals || {})], // for CDNs config

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [path.join(__dirname, '..', 'app'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      // {
      //   test: /\.module\.s?css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: {
      //           localIdentName: '[local]__[hash:base64:5]',
      //         },
      //       },
      //     },
      //     'postcss-loader',
      //   ],
      // },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
}

export default commonConfig
