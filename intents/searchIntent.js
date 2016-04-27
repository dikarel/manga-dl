module.exports = searchIntent;

var truthy = require("../util/arrayOperators").truthy;
var trim = require("../util/arrayOperators").trim;

function searchIntent(argv) {
  var intent = {command: "search"};
  var title = argv.slice(3).map(trim).filter(truthy).join(" ");

  if (title) {
    intent.title = title;
  } else {
    intent.error = "Provide search title (e.g. manga-dl search one piece)";
  }

  return intent;
}