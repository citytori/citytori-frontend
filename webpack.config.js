var path = require('path');
var webpack = require('webpack');
require('dotenv').config({ silent: true });

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: './public/js',
    publicPath: '/public'
  },
  module: {
    loaders: [
      { test: /\.html/, loader: 'html?minimize' }
    ],
  },
  resolve: {
    root: [path.join(__dirname, "bower_components")],
    alias: {
      'jquery.cookie': path.join(__dirname, "bower_components/jquery.cookie/jquery.cookie.js")
    }
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      jquery: "jquery"
    }),
    new webpack.DefinePlugin({
      CITYTORY_API_SERVER:
        JSON.stringify(process.env.CITYTORY_API_SERVER || 'http://localhost:8080')
    })
  ]
}
