module.exports = help;

// UNSURE: Should this be to stdout instead?
function help(intent, done) {
  console.error();
  console.error("Usage: manga-dl <command>");
  console.error();
  console.error("Commands:");
  console.error("  help            Show this message");
  console.error("  search <title>  Look for manga by title");
  console.error();
  console.error("Examples:");
  console.error("  manga-dl search one piece  Search for One Piece manga");
  console.error();

  done();
}
