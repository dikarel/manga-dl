const format = require('util').format
const assert = require('assert')

module.exports.name = (conf) => format('%s should reject invalid URLs', conf.name)

module.exports.createTest = (conf) => (test) => {
  conf.data.shouldRejectUrls
    .forEach((url) => assert(!conf.scraper.acceptsUrl(url), format('failed to reject invalid URL %s', url)))
  test.done()
}
