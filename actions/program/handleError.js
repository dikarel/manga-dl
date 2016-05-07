var package = require("../../package");
var format = require("util").format;

// Display error messages (if any)
module.exports = (err) => {
  if (!err) return;

  console.error(err.stack);
  console.error(format("Report issues at %s", package.bugs.url));

  process.exit(1);
};