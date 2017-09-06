var path = require('path');
var webpack = require('webpack');

var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './app.js',
        'webpack-hot-middleware/client'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
};

module.exports = config;
/**
 * 
 * Line 5.在提高应用程序的各种调试策略中，我们有一个选择，你可以访问网站https://webpack.github.io/docs/configuration.html#devtool
 * Line 6 - 8. 这里我们定义了app.js为应用程序的主入口。
 * Line 9 - 13. 这里我们制定了Webpack将打包的所有的模块成文件bundle.js,并且将bundle.js文件放在dist/路径下面。
 * 
 */