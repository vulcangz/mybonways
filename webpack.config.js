var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");
const glob = require('glob');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// let commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common-chunks');

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    index:"./public/ui/index.js",
    admin:"./public/admin/index.js",
    merchant:"./public/merchant/index.js",
    styles: glob.sync("./public/assets/css/partials/*.css")
  },
  output: {
    filename: "js/[name]-bundle.js",
    path: __dirname + "/public/assets"
  },
  // devtool: 'eval-source-map',
  plugins: [
    new ExtractTextPlugin("css/main.min.css"),
    new OptimizeCssAssetsPlugin(),
    new BabiliPlugin(),
    // new UglifyJsPlugin({
      //    exclude: [
      //      'js/merchant-bundle.js'
      //    ],
      //  }),
    // commonsPlugin
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: "babel-loader",
      options: {
        presets: ['env']
      },
      exclude: /node_modules/
    }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [ 'css-loader' ],

          })

    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: "url-loader?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: "file-loader"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: "url-loader?limit=10000&mimetype=image/svg+xml"
    }]
  }
};
