const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./app/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  resolve: {
    extensions: [".jsx", "..."],
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new HtmlPlugin({
      template: "app/index.html",
      title: "Github Battle By SP",
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
