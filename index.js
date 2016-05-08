var importScrapers = require("./actions/program/importScrapers");
var planJobs = require("./actions/program/planJobs");
var validateJobs = require("./actions/program/validateJobs");
var executeJobs = require("./actions/program/executeJobs");
var handleError = require("./actions/program/handleError");
var package = require("./package.json");
var program = require("commander");
var needle = require("needle");

// Metadata
program
  .version(package.version)
  .description(package.description)
  .usage("<reader URL> [reader URL...]")
  .option("-p, --parallelism", "Maximum concurrent downloads", parseInt, 5)
  .option("-d, --debug", "Show debug messages", false)
  .parse(process.argv);

// HTTP settings
needle.defaults({
  follow_max: 3
});

// Run actions
importScrapers(program)
  .then(planJobs)
  .then(validateJobs)
  .then(executeJobs)
  .catch(handleError);