const path = require('path')
const environment = require('./config/environment')
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// html Files
const templateFiles = fs
  .readdirSync(environment.paths.source)
  .filter((file) => path.extname(file).toLowerCase() === '.html')
const HtmlPluginEntries = templateFiles.map((template) =>
  new HtmlWebpackPlugin({
    filename: template,
    template: path.resolve(environment.paths.source, template),
    favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
    inject: true,
    hash: false,
    cache: true,
    minify: false
  })
)

module.exports = {

  entry: {
    app: path.resolve(environment.paths.source, 'js', 'app.js')
  },
  output: {
    path: path.resolve(environment.paths.output),
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new ESLintPlugin({
      fix: true
    }
    ),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css" 
    })
  ].concat(HtmlPluginEntries)

}
