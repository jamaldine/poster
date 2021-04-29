const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

 module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath:'build/'
    },
    module:{
      rules:[
        {
          use:'babel-loader',
          test:/\.js$/
        },
        {
          //use:['style-loader','css-loader'],
          test:/\.css$/,
          /*use:[
            {loader:"style-loader/url"},
            {
              loader:"file-loader",
              options:{
                name:'[name].[ext]'
              }
            }
          ]*/
          use:ExtractTextPlugin.extract({
            use:'css-loader'
          })
        }
      ]
    },
    plugins:[
      new ExtractTextPlugin('style.css')
    ]
}