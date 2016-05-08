var parseHtml = require("fast-html-parser").parse;
var readFile = require("fs").readFileSync;
var join = require("path").join;

// Grab DOM from a sample HTML
module.exports = (identifier) =>
  parseHtml(readFile(join(__dirname, "..", "samples", identifier + ".html"), "utf8"), {
    script: true
  });