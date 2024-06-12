// vue.config.js
const webpack = require('webpack');

module.exports = {
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      definitions[0]['process.env']['NODE_OPTIONS'] = JSON.stringify('--openssl-legacy-provider');
      return definitions;
    });
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_OPTIONS': JSON.stringify('--openssl-legacy-provider')
      })
    ]
  }
};
