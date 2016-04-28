module.exports = searchIntent;

function searchIntent(argv) {
  var op = require("../util/arrayOperators");
  var title = argv.slice(3).map(op.trim).filter(op.truthy).join(" ");
  var intent = {command: "search"};

  if (title) {
    intent.title = title;
  } else {
    throw new Error("Provide search title (e.g. manga-dl search one piece)");
  }

  return intent;
}