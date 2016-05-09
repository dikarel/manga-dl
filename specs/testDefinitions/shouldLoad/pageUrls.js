const format = require("util").format;
const assert = require("assert");

module.exports.name = (conf, loadConf) =>
  format("%s should load page URLs from %s", conf.name, loadConf.source);

module.exports.createTest = (conf, loadConf) =>
  (test) => {
    const pageUrls = conf.scraper.pageUrls(loadConf.dom);
    const actualTotalPages = pageUrls.length;
    const expectedTotalPages = loadConf.totalPageUrls;
    const actualFirstPage = pageUrls.length ? pageUrls[0] : null;
    const expectedFirstPage = loadConf.firstPageUrl;
    const actualLastPage = pageUrls.length ? pageUrls[pageUrls.length - 1] : null;
    const expectedLastPage = loadConf.lastPageUrl;

    assert(actualTotalPages == expectedTotalPages,
      format("failed to load page URLs correctly (# pages is %s, but should be %s)",
        actualTotalPages, expectedTotalPages));

    assert(actualFirstPage == expectedFirstPage,
      format("failed to load page URLs correctly (first page is %s, but should be %s)",
        actualFirstPage, expectedFirstPage));

    assert(actualLastPage == expectedLastPage,
      format("failed to load page URLs correctly (last page is %s, but should be %s)",
        actualLastPage, expectedLastPage));

    test.done();
  };