const path = require('path')
const environment = require('./environment')
/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge')
//const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const webpackConfiguration = require('../webpack.config')

module.exports = merge(webpackConfiguration, {
  mode: 'production',
  output: {
    path: path.resolve(environment.paths.build)
  },

  /* Manage source maps generation process. Refer to https://webpack.js.org/configuration/devtool/#production */
  devtool: false,

  /* Optimization configuration */
  optimization: {
    minimize: false
  },

  /* Performance treshold configuration values */
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  /* Additional plugins configuration */
  plugins: []
})
