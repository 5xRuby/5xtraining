const path = require("path");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["./src/root.jsx", "react-hot-loader/patch"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        include: /src/,
        loader: "eslint-loader",
        options: {
          formatter: eslintFormatter,
          // not emit error, then even js has error, and still can be complie
          emitWarning: true,
          fix: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: /src/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["react-hot-loader/babel", "@babel/plugin-transform-runtime"]
        }
      },
      {
        test: /\.scss$/,
        include: /src/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: /src/,
        use: [
          {
            loader: "url-loader",
            options: {
              outputPath: "images/",
              limit: 10 * 1024
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
      "@": path.join(__dirname, "src")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  devServer: {},
  watchOptions: {
    //not watch file in node_modules
    ignored: /node_modules/
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};
