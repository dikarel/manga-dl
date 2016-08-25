const Promise = require('bluebird')
const join = require('path').join

const readdir = Promise.promisify(require('fs').readdir)

// Import scraper libs, placing them in program.scrapers
module.exports = (program) => {
  const scraperDir = join(__dirname, '..', '..', 'scrapers')

  return readdir(scraperDir)
    .then((jsFilenames) => {
      program.scrapers = jsFilenames.map((filename) => require(join(scraperDir, filename))
      )

      return program
    })
}
