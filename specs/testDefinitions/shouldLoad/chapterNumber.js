const format = require("util").format;
const assert = require("assert");

module.exports.name = (conf, loadConf) =>
  format("%s should load chapter number from %s", conf.name, loadConf.source);

module.exports.createTest = (conf, loadConf) =>
  (test) => {
    const actual = conf.scraper.chapterNumber(loadConf.dom);
    const expected = loadConf.chapterNumber;

    assert(actual == expected, format("failed to load chapter number correctly (is %s, but should be %s)", actual, expected));
    test.done();
  };