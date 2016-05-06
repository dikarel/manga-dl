var extname = require("path").extname;
var getHttp = require("needle").get;
var waterfall = require("async/waterfall");
var mkdirp = require("mkdirp");
var parseHtml = require("fast-html-parser").parse;

module.exports = (download, scraper, done) => waterfall([

  // Prepare local dir
  (done) => mkdirp(download.localDirname, done),

  // Download reader page
  (_, done) => getHttp(download.pageUrl, (err, res, readerHtml) => {
    if (err) return done(err);
    if (res.statusCode != 200) return done(new Error("HTTP " + res.statusCode));
    done(null, readerHtml);
  }),

  // Download page image
  (readerHtml, done) => {
    var readerDom = parseHtml(readerHtml);
    var imageUrl = scraper.imageUrl(readerDom);

    getHttp(imageUrl, {
      output: download.localFilename + extname(imageUrl)
    }, done);
  }

], done);