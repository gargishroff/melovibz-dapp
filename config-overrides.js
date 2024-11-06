const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    "stream": require.resolve("stream-browserify"),
    "crypto": require.resolve("crypto-browserify"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "vm": require.resolve('vm-browserify'),
    "url": require.resolve("url/"),
    "process": require.resolve("process/browser")
  };
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);
  config.module.rules.push({ 
    test: /\.m?js/, 
    resolve: { fullySpecified: false } 
  });
  return config;
};
