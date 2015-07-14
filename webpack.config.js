var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: './client/assets/js/cloudbudget.js',
  output: {
    path: 'client/assets',
    filename: 'bundle.js',
  },
  devtool: "#source-map"
};