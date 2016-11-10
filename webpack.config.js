// https://github.com/christianalfoni/webpack-express-boilerplate

let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
console.info('Loading webpack.config');
console.info('Server environment', process.env.NODE_ENV);

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
    path.join(__dirname, 'index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    pathinfo: true,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    // new BundleAnalyzerPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: ["react-hot-loader/babel"],
          presets: [["es2015", { "loose" : true }], "stage-0", "react"]
        }
      },
      //   {
      //      test: /\.jsx?$/,
      //      exclude: /node_modules/,
      //      loader: 'babel',
      //      query: {
      //        plugins: ['transform-runtime'],
      //        presets: [ "es2015", "stage-0","react", "react-hmre"]
      //      }
      //    },
      // {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}, //<--working!!!
      // {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: babelSettings},
      {test: /bootstrap.+\.(jsx|js)$/, loader: 'imports?jQuery=jquery,$=jquery,this=>window'}, /**/
      // { test: /\.css$/, loader: ExtractTextPlugin.extract({
      //   fallbackLoader: "style-loader",
      //   loader: "css-loader"
      // }) },
      {test: /(\.css)$/, loader: "style!css"},
      {test: /\.png$/, loader: "url-loader?limit=100000"},
      {test: /\.jpg$/, loader: "file-loader"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
    ]
  }
};
