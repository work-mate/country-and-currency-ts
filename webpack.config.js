const path = require("path");

module.exports = {
  entry: "./lib/index.js",
  output: {
    filename: "bundle.js",
    library: "CountryAndCurrency",
    path: path.resolve(__dirname, "dist"),
  },
};
