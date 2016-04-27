process.title = "manga-dl";

var getUserIntent = require("./util/getUserIntent");
var intent = getUserIntent(process.argv);
var assert = require("assert");

var commands = {
  help: require("./commands/help"),
  search: require("./commands/search")
};

if (intent) {
  if (intent.error) {
    // Valid command, bad arguments
    console.error();
    console.error("ERROR: " + intent.error);
    console.error();
    process.exit(1);
  } else {
    // Valid command and arguments
    var command = commands[intent.command];
    assert(command, "Couldn't find command function");
    command(intent);
  }
} else {
  // Invalid command
  commands.help();
  process.exit(1);
}