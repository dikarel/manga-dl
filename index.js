var package = require("./package.json");
var program = require("commander");
var format = require("util").format;
var sanitizeUrl = require("./util/sanitizeUrl");
var planDownloads = require("./util/planDownloads");
var downloadPage = require("./util/downloadPage");
var eachSeries = require("async/eachSeries");
var waterfall = require("async/waterfall");
var eachLimit = require("async/eachLimit");

// Scrapers collection
var scrapers = [
  require("./scrapers/mangareader"),
  require("./scrapers/mangafox")
];

// Program metadata
program
  .version(package.version)
  .description(package.description)
  .usage("<online reader URL>")
  .parse(process.argv);

// HACK: Hard-code for now
program.parallelism = 3;

// Organize into URL info tuples for the upcoming steps
var urlInfos = program.args
  .map(sanitizeUrl)
  .filter((u) => u)
  .map((url) => {
    return {
      url: url,
      scraper: scrapers.filter((s) => s.acceptsUrl(url))[0]
    };
  });

// Show help in case we have no input
if (!urlInfos.length) {
  program.outputHelp();
  process.exit(1);
}

// Show error for unsupported URLs
var unsupportedUrls = urlInfos.filter((info) => !info.scraper);
if (unsupportedUrls.length) {
  unsupportedUrls.forEach((info) => {
    console.error(format("Error: The URL '%s' is currently unsupported", info.url));
  });

  console.error("Note: You must use the URL of an online viewer (e.g. http://www.mangareader.net/world-trigger/142)");
  console.error("      Only mangareader.net is supported at the moment");
  process.exit(1);
}

// Run the downloads one at a time, in order
eachSeries(urlInfos, (urlInfo, done) => waterfall([

  // Plan downloads
  (done) => {
    console.log(format("Reading %s...", urlInfo.url));
    planDownloads(urlInfo.url, urlInfo.scraper, done);
  },

  // Download pages
  (downloads, done) => {
    var seriesName = downloads[0].seriesName;
    var chapterNumber = downloads[0].chapterNumber;
    var localDirname = downloads[0].localDirname;

    console.log(format("Downloading '%s' ch. %s into '%s'...", seriesName, chapterNumber, localDirname));
    eachLimit(downloads, program.parallelism, (dl, done) => downloadPage(dl, urlInfo.scraper, done), done);
  }

], done), done);

function done(err) {
  if (err) {
    console.error(error.message);
    process.exit(1);
  }

  console.log("Done");
}