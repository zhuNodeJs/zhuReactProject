var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtools: 'source-map',
  entry: [
    './app.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
    })
  ],
  module: {
    loaders: [
      {
        test:/\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  }  
}
