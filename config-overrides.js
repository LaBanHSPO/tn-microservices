const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackAlias
} = require("customize-cra");

const path = require("path");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addDecoratorsLegacy(),
  addWebpackAlias({
    "@/*": path.resolve(__dirname, "src"),
    "components/*": path.resolve(__dirname, "src/components")
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#ffae00" }
  })
);
