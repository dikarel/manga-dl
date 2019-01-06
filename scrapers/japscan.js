module.exports = {
  domain: () => 'japscan.to',

  isAjax: () => false,

  acceptsUrl: (url) => url.match(/^https?:\/\/(www\.)?japscan\.to\/lecture-en-ligne\/([a-z0-9-]+)\/\d+(\/\d+)?(\/|(\.html))?$/i),

  seriesName: (dom) => dom.querySelector('title').text.match(/(.+)\s\d+\sVF.*/)[1],

  chapterNumber: (dom) => parseInt(dom.querySelector('title').text.match(/.+\s(\d+)\sVF.*/)[1]),

  pageUrls: (dom) => dom.querySelectorAll('#pages option').map((o) => 'https://www.japscan.to' + o.attributes.value),

  imageUrls: (dom) => [dom.querySelector('#image').attributes['data-src']]
}
