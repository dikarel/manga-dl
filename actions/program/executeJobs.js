const extractPageInfo = require("../job/extractPageInfo");
const downloadPages = require("../job/downloadPages");
const convertPagesToEpub = require("../job/convertPagesToEpub");
const convertEpubToMobi = require("../job/convertEpubToMobi");
const planDownloads = require("../job/planDownloads");
const Promise = require("bluebird");

// Runs all jobs to completion
module.exports = (program) =>
  Promise.each(program.jobs, (job) =>
    extractPageInfo(job)
    .then(planDownloads)
    .then(downloadPages)
    .then(job.convertPagesToEpub ? convertPagesToEpub : (j) => j)
    .then(job.convertEpubToMobi ? convertEpubToMobi : (j) => j)
  ).then(() => {
    console.log("Done. Check your local directory for downloaded files");
    return program;
  });