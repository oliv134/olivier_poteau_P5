const { merge } = require("webpack-merge")
const webpackEs5Configuration = require("./webpack.es5.config")
const webpackBuildConfiguration = require("./webpack.build.config")
module.exports = merge(webpackBuildConfiguration, webpackEs5Configuration)