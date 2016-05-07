var importScrapers = require("./actions/program/importScrapers");
var planJobs = require("./actions/program/planJobs");
var validateJobs = require("./actions/program/validateJobs");
var executeJobs = require("./actions/program/executeJobs");
var handleError = require("./actions/program/handleError");
var package = require("./package.json");
var program = require("commander");
var Promise = require("bluebird");

// Metadata
program
  .version(package.version)
  .description(package.description)
  .usage("<reader URL> [reader URL...]")
  .option("-p, --parallelism", "Maximum concurrent downloads", parseInt, 3)
  .parse(process.argv);

// Run actions
importScrapers(program)
  .then(planJobs)
  .then(validateJobs)
  .then(executeJobs)
  .catch(handleError);