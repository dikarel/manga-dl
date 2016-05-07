var parseHtml = require("fast-html-parser").parse;
var dirname = require("path").dirname;
var extname = require("path").extname;
var format = require("util").format;
var Promise = require("bluebird");
var join = require("path").join;
var os = require("os");

var tmpName = Promise.promisify(require("tmp").tmpName);
var httpGet = Promise.promisify(require("needle").get);
var mkdirp = Promise.promisify(require("mkdirp"));

// Download pages listed in job.pageUrls; stores download paths in job.localPagePaths
module.exports = (job) => {
  var mapOptions = {
    concurrency: job.parallelism
  };

  console.log(format("Downloading %s chapter %s... (%s pages)", job.seriesName, job.chapterNumber, job.pageUrls.length));

  return Promise.map(job.pageUrls, (url, i) =>
      getImageUrl(job, url)
      .then((imageUrl) => {
        var getLocalPath = job.convertPagesToEpub ? getTmpPath : Promise.method(getLocalDirPath);
        return getLocalPath(job, i + 1, imageUrl).then((localPath) =>
          mkdirp(dirname(localPath))
          .then(() => downloadImage(imageUrl, localPath))
        );
      }), mapOptions)
    .then((localPagePaths) => {
      job.localPagePaths = localPagePaths;
      return job;
    });
};

// Download image and save it locally; returns local path
function downloadImage(imageUrl, localPath) {
  var options = {
    output: localPath
  };

  return httpGet(imageUrl, options)
    .then((res) => {
      if (res.statusCode != 200) throw new Error(format("Failed to download %s (HTTP %s)", imageUrl, res.statusCode));
      return localPath;
    });
}

// Download reader page to grab image URL
function getImageUrl(job, pageUrl) {
  return httpGet(pageUrl)
    .then((res) => {
      if (res.statusCode != 200) throw new Error(format("Failed to download %s (HTTP %s)", pageUrl, res.statusCode));
      return job.scraper.imageUrl(parseHtml(res.body));
    });
}

function getLocalDirPath(job, pageNumber, imageUrl) {
  return join(job.seriesName, job.chapterNumber.toString(), format("page-%s%s", pageNumber.toString(), extname(imageUrl)));
}

function getTmpPath() {
  return tmpName(os.tmpdir());
}