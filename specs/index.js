const parseHtml = require('fast-html-parser').parse
const readFile = require('fs').readFileSync
const readdir = require('fs').readdirSync
const join = require('path').join

const loadTestDefinitions = importLoadTestDefinitions()
const testDefinitions = importTestDefinitions()
const readme = loadReadme()

module.exports =
  loadTestConfig()
    .map(loadScraper)
    .map(loadSampleDoms)
    .map(conf => Object.assign(conf, {readme: readme}))
    .map(conf => Object.assign(createTestSuite(conf, testDefinitions), createLoadTestSuite(conf, loadTestDefinitions)))
    .reduce(combineDict)

function loadTestConfig () {
  return readdir(__dirname)
    .filter((filename) => filename.match(/\.json$/i))
    .map((filename) => {
      return {
        name: filename.replace(/\.json$/i, ''),
        data: require('./' + filename)
      }
    })
}

function loadScraper (conf) {
  return Object.assign(conf, {
    scraper: require(join(__dirname, '..', 'scrapers', conf.name))
  })
}

function loadSampleDoms (conf) {
  return Object.assign(conf, {
    shouldLoad: conf.data.shouldLoad
      .map((loadConf) => Object.assign(loadConf, {
        dom: parseHtml(readFile(join(__dirname, 'samples', loadConf.source), 'utf8'), {
          script: true
        })
      }))
  })
}

function importTestDefinitions () {
  return readdir(join(__dirname, 'testDefinitions'))
    .filter((filename) => filename.match(/\.js$/i))
    .map((filename) => require('./testDefinitions/' + filename))
}

function importLoadTestDefinitions () {
  return readdir(join(__dirname, 'testDefinitions', 'shouldLoad'))
    .filter((filename) => filename.match(/\.js$/i))
    .map((filename) => require('./testDefinitions/shouldLoad/' + filename))
}

function loadReadme () {
  return readFile(join(__dirname, '..', 'readme.md'), 'utf8')
}

function createTestSuite (conf, testDefinitions) {
  var testSuite = {}

  testDefinitions.forEach((def) => {
    testSuite[def.name(conf)] = def.createTest(conf)
  })

  return testSuite
}

function createLoadTestSuite (conf, loadTestDefinitions) {
  var testSuite = {}

  conf.shouldLoad.forEach((loadConf) => {
    loadTestDefinitions.forEach((def) => {
      testSuite[def.name(conf, loadConf)] = def.createTest(conf, loadConf)
    })
  })

  return testSuite
}

function combineDict (a, b) {
  return Object.assign({}, a, b)
}
