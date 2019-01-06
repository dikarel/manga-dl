const parseHtml = require('fast-html-parser').parse
const format = require('util').format
const Promise = require('bluebird')
const join = require('path').join
const os = require('os')

const tmpName = Promise.promisify(require('tmp').tmpName)
const httpGet = Promise.promisify(require('cloudscraper').get)
const mkdirp = Promise.promisify(require('mkdirp'))

// Plan downloads based on extracted info (by selecting correct strategies)
module.exports = (job) => {
  job.generateLocalPath = job.convertPagesToEpub ? getTmpPath : prepareLocalPath
  job.totalPages = job.isAjax ? job.imageUrls.length : job.pageUrls.length
  job.getImageUrl = job.isAjax ? Promise.method((i) => job.imageUrls[i]) : getImageUrlFromPageReader

  return job
}

function getTmpPath () {
  return tmpName(os.tmpdir())
}

function getImageUrlFromPageReader (index) {
  return httpGet(this.pageUrls[index]).then((res) => {
    if (res.statusCode !== 200) throw new Error(format('Failed to download %s (HTTP %s)', this.pageUrls[index], res.statusCode))
    let imageUrls = this.scraper.imageUrls(parseHtml(res.body.toString('utf8')));
    console.log("getImageUrlFromPageReader", imageUrls)
    return imageUrls[0]
  })
}

function prepareLocalPath (index, extname) {
  const localDir =
  (this.chapterNumber === -1 ? this.seriesName : join(this.seriesName, this.chapterNumber.toString()))

  return mkdirp(localDir)
    .then(() => join(localDir, format('page-%s%s', (index + 1).toString(), extname))
  )
}
