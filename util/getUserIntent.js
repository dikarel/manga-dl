module.exports = getUserIntent;

var intentGenerators = {
  search: require("../intents/searchIntent")
};

function getUserIntent(argv) {
  var command = argv[2];
  var getIntent = intentGenerators[command];

  if (!getIntent) return null;
  return getIntent(argv);
}