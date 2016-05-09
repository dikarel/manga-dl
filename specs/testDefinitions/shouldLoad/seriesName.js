const format = require("util").format;
const assert = require("assert");

module.exports.name = (conf, loadConf) =>
  format("%s should load series name from %s", conf.name, loadConf.source);

module.exports.createTest = (conf, loadConf) =>
  (test) => {
    const actual = conf.scraper.seriesName(loadConf.dom);
    const expected = loadConf.seriesName;

    assert(actual == expected, format("failed to load series name correctly (is %s, but should be %s)", actual, expected));
    test.done();
  };