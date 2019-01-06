const importScrapers = require('./actions/program/importScrapers')
const planJobs = require('./actions/program/planJobs')
const validateJobs = require('./actions/program/validateJobs')
const executeJobs = require('./actions/program/executeJobs')
const handleError = require('./actions/program/handleError')
const packageJson = require('./package.json')
const program = require('commander')
//const needle = require('cloudscraper')

// Metadata
program
  .version(packageJson.version)
  .description(packageJson.description)
  .usage('<reader URL> [reader URL...]')
  .option('-p, --parallelism', 'Maximum concurrent downloads', parseInt, 5)
  .option('-d, --debug', 'Show debug messages', false)
  .parse(process.argv)

// HTTP settings
/*needle.defaults({
  follow_max: 3
})*/

// Ask for feedback
console.log()
console.log('Take a minute to improve manga-dl')
console.log('Answer 4 questions at https://goo.gl/forms/n1SjBAcilIRi50D22')
console.log()

// Run actions
importScrapers(program)
  .then(planJobs)
  .then(validateJobs)
  .then(executeJobs)
  .catch(handleError)
