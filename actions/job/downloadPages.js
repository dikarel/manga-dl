const extname = require('path').extname
const format = require('util').format
const Promise = require('bluebird')
const needle = require('needle')

const fsStat = Promise.promisify(require('fs').stat)
const httpHead = Promise.promisify(needle.head)
const httpGet = Promise.promisify(needle.get)

// Download pages; stores download paths in job.localPagePaths
module.exports = (job) => {
  if (job.chapterNumber === -1) {
    console.log(format('Downloading %s... (%s pages)', job.seriesName, job.totalPages))
  } else {
    console.log(format('Downloading %s chapter %s... (%s pages)', job.seriesName, job.chapterNumber, job.totalPages))
  }

  return Promise.each(zeroTo(job.totalPages - 1), (index) => job.getImageUrl(index)
    .then((imageUrl) => job.generateLocalPath(index, extname(imageUrl).toLowerCase())
      .then((localPath) => checkIfAlreadyDownloaded(imageUrl, localPath)
        .then((alreadyDownloaded) => alreadyDownloaded ? localPath : downloadImage(imageUrl, localPath)))
  ), {
    concurrency: job.parallelism
  })
    .then((localPagePaths) => {
      job.localPagePaths = localPagePaths
      return job
    })
}

// Returns file size (-1 if non-existent)
function getFileSize (path) {
  return fsStat(path)
    .then((f) => f.size)
    .error(() => -1)
}

// Generates an array of integers from 0 to upperBound (inclusive)
function zeroTo (upperBound) {
  return Array.from(Array(upperBound + 1).keys())
}

// Check whether or not an image has already been downloaded
function checkIfAlreadyDownloaded (imageUrl, localPath) {
  return getFileSize(localPath)
    .then((fileSize) => {
      if (fileSize === -1) return false
      return httpHead(imageUrl)
        .then((res) => {
          if (res.statusCode !== 200) throw new Error(format('Failed to get filesize of %s (HTTP %s)', imageUrl, res.statusCode))
          return (fileSize === parseInt(res.headers['content-length']))
        })
    })
}

// Download image and save it locally; returns local path
function downloadImage (imageUrl, localPath) {
  return httpGet(imageUrl, {
    output: localPath
  })
    .then((res) => {
      if (res.statusCode !== 200) throw new Error(format('Failed to download %s (HTTP %s)', imageUrl, res.statusCode))
      return localPath
    })
}
