var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new HtmlWebpackPugPlugin()
    ]
  }
}