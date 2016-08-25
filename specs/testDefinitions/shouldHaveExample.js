const format = require('util').format
const assert = require('assert')

module.exports.name = (conf) => format('%s should have a properly-formatted example in the readme file', conf.name)

module.exports.createTest = (conf) => (test) => {
  var domain = conf.scraper.domain()
  assert(conf.readme.indexOf(domain + ' ([sample reader url](') !== -1,
    format('did not have a properly-formatted example for %s', domain))
  test.done()
}
