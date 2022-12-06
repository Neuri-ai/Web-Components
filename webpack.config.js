const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: {
    'modal': path.resolve(__dirname, 'src/modal.js'),
    'mic': path.resolve(__dirname, 'src/microphone.js'),
    'web-components.bundle.min': path.resolve(__dirname, 'src/index.js')
  },
  mode: "production",
  resolve: {
    extensions: [".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template:  path.join(__dirname, "public/index.html"),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
      directory: path.join(__dirname, "dist")
    },
    compress: true,
    port: 8080,
  },
};