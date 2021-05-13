const { merge } = require("webpack-merge")
const webpackEs5Configuration = require("./webpack.es5.config")
const webpackProdConfiguration = require("./webpack.prod.config")
module.exports = merge(webpackProdConfiguration, webpackEs5Configuration)