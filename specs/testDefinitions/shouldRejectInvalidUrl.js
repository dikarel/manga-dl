const format = require("util").format;
const assert = require("assert");

module.exports.name = (conf) =>
  format("%s => should reject invalid URLs", conf.name);

module.exports.createTest = (conf) =>
  (test) => {
    conf.data.shouldRejectUrls
      .forEach((url) =>
        assert(!conf.scraper.acceptsUrl(url), format("%s failed to reject invalid URL %s", conf.name, url)));
    test.done();
  };