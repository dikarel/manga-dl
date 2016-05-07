var extractPageInfo = require("../job/extractPageInfo");
var downloadPages = require("../job/downloadPages");
var convertPagesToEpub = require("../job/convertPagesToEpub");
var convertEpubToMobi = require("../job/convertEpubToMobi");
var Promise = require("bluebird");

module.exports = (program) => Promise.each(program.jobs, (job) => {

  // Default steps
  var promise = extractPageInfo(job)
    .then(downloadPages);

  // Extra steps
  if (job.convertPagesToEpub) promise = promise.then(convertPagesToEpub);
  if (job.convertEpubToMobi) promise = promise.then(convertEpubToMobi);

  return promise;
}).then(() => {
  // Success message
  console.log("Done. Check your local directory for downloaded files");
  return program;
});