var parseHtml = require("fast-html-parser").parse;
var format = require("util").format;
var Promise = require("bluebird");

var httpGet = Promise.promisify(require("needle").get);

// Get chapter metadata; places them in job.seriesName, job.chapterNumber, job.pageUrls
module.exports = (job) => {
  console.log(format("Extracting info from %s...", job.url));

  // Download reader page
  return httpGet(job.url).then((res) => {
    if (res.statusCode != 200) throw new Error(format("Failed to download %s (HTTP %s)", job.url, res.statusCode));

    var dom = parseHtml(res.body);
    job.seriesName = job.scraper.seriesName(dom);
    job.chapterNumber = job.scraper.chapterNumber(dom);
    job.pageUrls = job.scraper.pageUrls(dom);

    return job;
  });
};