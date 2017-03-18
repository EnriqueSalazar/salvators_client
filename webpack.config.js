// https://github.com/christianalfoni/webpack-express-boilerplate

let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin');
var HappyPack = require('happypack');

// let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
console.info('Loading webpack.config');
console.info('Server environment', process.env.NODE_ENV);

module.exports = {
  cache: true,
  // devtool: "eval", //or cheap-module-eval-source-map
  devtool: "#eval-source-map",
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
    path.join(__dirname, 'src', 'index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    pathinfo: true,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    // new webpack.DllReferencePlugin({
    //   context: path.join(__dirname),
    //   manifest: require("./dll/vendor-manifest.json")
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "commons",
    //   // (the commons chunk name)
    //
    //   filename: "commons.js",
    //   // (the filename of the commons chunk)
    //
    //   // minChunks: 3,
    //   // (Modules must be shared between 3 entries)
    //
    //   // chunks: ["pageA", "pageB"],
    //   // (Only use these entries)
    // }),
    new HappyPack({
      // loaders is the only required parameter:
      id: 'jsx',
      loaders: ['babel-loader?cacheDirectory'],
      threads: 4,
      // customize as needed, see Configuration below
    }),
    // new HappyPack({
    //   // loaders is the only required parameter:
    //   id: 'bootstrap',
    //   loaders: ['imports?jQuery=jquery,$=jquery,this=>window'],
    //   threads: 4,
    //   // customize as needed, see Configuration below
    // }),
    // new HappyPack({
    //   // loaders is the only required parameter:
    //   id: 'css',
    //   loaders: ['style!css'],
    //   threads: 4,
    //   // customize as needed, see Configuration below
    // }),
    // new HappyPack({
    //   // loaders is the only required parameter:
    //   id: 'png',
    //   loaders: ['url-loader?limit=100000'],
    //   threads: 2,
    //   // customize as needed, see Configuration below
    // }),
    // new HappyPack({
    //   // loaders is the only required parameter:
    //   id: 'jpg',
    //   loaders: ['file-loader'],
    //   threads: 2,
    //   // customize as needed, see Configuration below
    // }),
    // new HappyPack({
    //   // loaders is the only required parameter:
    //   id: 'eot',
    //   loaders: ['file'],
    //   threads: 2,
    //   // customize as needed, see Configuration below
    // }),
    // new HappyPack({
    //   // loaders is the only required parameter:
    //   id: 'woff',
    //   loaders: ['url?prefix=font/&limit=5000'],
    //   threads: 2,
    //   // customize as needed, see Configuration below
    // }),
    // new HappyPack({
    //   // loaders is the only required parameter:
    //   id: 'ttf',
    //   loaders: ['url?limit=10000&mimetype=application/octet-stream'],
    //   threads: 2,
    //   // customize as needed, see Configuration below
    // }),
    // new HappyPack({
    //   // loaders is the only required parameter:
    //   id: 'svg',
    //   loaders: ['url?limit=10000&mimetype=image/svg+xml'],
    //   threads: 2,
    //   // customize as needed, see Configuration below
    // }),
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    // new webpack.optimize.OccurrenceOrderPlugin(),
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
        loader: 'happypack/loader?id=jsx',
        include: [
          path.join(__dirname, "src") //important for performance!
        ],
      },
      // {
      //   test: /bootstrap.+\.(jsx|js)$/, loader: 'happypack/loader?id=bootstrap',
      // }, /**/
      // {
      //   test: /(\.css)$/, loader: 'happypack/loader?id=css',
      // },
      {
        test: /bootstrap.+\.(jsx|js)$/,
        loader: 'imports?jQuery=jquery,$=jquery,this=>window'
      },
      {test: /(\.css)$/, loader: "style!css"},
      {test: /\.png$/, loader: "url-loader?limit=100000"},
      {test: /\.jpg$/, loader: "file-loader"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
      // {
      //   test: /\.png$/, loader: 'happypack/loader?id=png',
      // },
      // {
      //   test: /\.jpg$/, loader: 'happypack/loader?id=jpg',
      // },
      // {
      //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'happypack/loader?id=eot',
      // },
      // {
      //   test: /\.(woff|woff2)$/, loader: 'happypack/loader?id=woff',
      // },
      // {
      //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'happypack/loader?id=ttf',
      // },
      // {
      //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'happypack/loader?id=svg',
      // }
    ]
  }
};
