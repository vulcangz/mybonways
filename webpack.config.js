var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const BabiliPlugin = require("babili-webpack-plugin");
// let commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common-chunks');

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    index:"./public/ui/index.js",
    admin:"./public/admin/index.js",
    merchant:"./public/merchant/index.js",
  },
  output: {
    filename: "js/[name]-bundle.js",
    path: __dirname + "/public/assets"
  },
  // devtool: 'eval-source-map',
  plugins: [
    new ExtractTextPlugin("css/common.css"),
    // new BabiliPlugin(),
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
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use:
        [{
          loader: "css-loader",
          // options: { sourceMap: true }
      	},
        {
          loader: "sass-loader",
          // options: { sourceMap: true }
        }]
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
