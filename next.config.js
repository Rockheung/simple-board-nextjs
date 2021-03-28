const path = require("path");

module.exports = {
  env: {},
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
