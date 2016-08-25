const packageJson = require('../../package')
const format = require('util').format

// Validate jobs stored inside program.jobs; if there' anything wrong, display error messages and quit
module.exports = (program) => {
  // Show help in case we have no input
  if (!program.jobs.length) {
    program.outputHelp()
    process.exit(1)
  }

  // Figure out which jobs are unsupported
  const unsupportedJobs = program.jobs.filter((info) => !info.scraper)
  if (!unsupportedJobs.length) return program

  // Unsupported URLs list
  unsupportedJobs.forEach((job) => {
    console.error(format('Error: The URL %s is not supported', job.url))
  })

  // Supported sites list
  const supportedSites = program.scrapers.map((s) => s.domain()).join(', ')
  console.error(format('Make sure you are using online reader URLs from one or more of the following sites: %s', supportedSites))
  console.error(format('Request additional sites at %s', packageJson.bugs.url))

  process.exit(1)
}
