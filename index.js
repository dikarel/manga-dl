process.title = "manga-dl";

// Figure out intent
try {
  var intent = require("./util/getUserIntent")(process.argv);

  if (!intent) {
    require("./commands/help")(function() {
      process.exit(1);
    });
  }
} catch (error) {
  console.error();
  console.error("ERROR: " + error.message);
  console.error();
  process.exit(1);
}

// Execute command
require("./commands/" + intent.command)(intent, function(error) {
  if (!error) return;

  console.error();
  console.error("ERROR: " + error.message);
  process.exit(1);
});
