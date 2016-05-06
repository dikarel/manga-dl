var getHtml = require("needle").get;
var parseHtml = require("fast-html-parser").parse;
var join = require("path").join;

module.exports = (readerUrl, scraper, done) => getHtml(readerUrl, (err, res, readerHtml) => {
  if (err) return done(err);
  if (res.statusCode != 200) return done(new Error("HTTP " + res.statusCode));

  // Scrape reader page
  var readerDom = parseHtml(readerHtml);
  var seriesName = scraper.seriesName(readerDom);
  var chapterNumber = scraper.chapterNumber(readerDom);
  var pageUrls = scraper.pageUrls(readerDom);

  // Generate downloads list
  var downloads = pageUrls.map((pageUrl, i) => {
    var localDirname = join(seriesName, chapterNumber.toString());

    return {
      seriesName: seriesName,
      chapterNumber: chapterNumber,
      localDirname: localDirname,
      localFilename: join(localDirname, "page-" + (i + 1)),
      pageUrl: pageUrl
    };
  });

  done(null, downloads);
});