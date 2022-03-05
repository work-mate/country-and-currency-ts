const path = require("path");

module.exports = {
  entry: "./lib/index.js",
  output: {
    filename: "bundle.js",
    library: "CountryAndCurrencyLib",
    path: path.resolve(__dirname, "dist"),
  },
};
