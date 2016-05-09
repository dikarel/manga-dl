const importScrapers = require("./actions/program/importScrapers");
const planJobs = require("./actions/program/planJobs");
const validateJobs = require("./actions/program/validateJobs");
const executeJobs = require("./actions/program/executeJobs");
const handleError = require("./actions/program/handleError");
const validateTools = require("./actions/program/validateTools");
const package = require("./package.json");
const program = require("commander");
const needle = require("needle");

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
  .then(validateTools)
  .then(executeJobs)
  .catch(handleError);