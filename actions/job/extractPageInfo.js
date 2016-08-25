const parseHtml = require('fast-html-parser').parse
const format = require('util').format
const Promise = require('bluebird')

const httpGet = Promise.promisify(require('needle').get)

// Get chapter metadata; places them in job.seriesName, job.chapterNumber, job.pageUrls
module.exports = (job) => {
  console.log(format('Extracting info from %s...', job.url))

  // Download reader page
  return httpGet(job.url).then((res) => {
    if (res.statusCode !== 200) throw new Error(format('Failed to download %s (HTTP %s)', job.url, res.statusCode))

    const dom = parseHtml(res.body, {
      script: true
    })

    job.seriesName = job.scraper.seriesName(dom)
    job.chapterNumber = job.scraper.chapterNumber(dom)
    job.imageUrls = job.scraper.imageUrls(dom)
    job.pageUrls = job.scraper.pageUrls(dom)
    job.isAjax = job.scraper.isAjax(dom)

    return job
  })
}
