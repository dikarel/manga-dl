module.exports = {
  domain: () => 'japscan.cc',

  isAjax: () => false,

  acceptsUrl: (url) => url.match(/^https?:\/\/(www\.)?japscan\.cc\/lecture-en-ligne\/([a-z0-9-]+)\/\d+(\/\d+)?(\/|(\.html))?$/i),

  seriesName: (dom) => dom.querySelector('#mangas').attributes['data-nom'],

  chapterNumber: (dom) => parseInt(dom.querySelector('#chapitres').attributes['data-uri']),

  pageUrls: (dom) => dom.querySelectorAll('#pages option').map((o) => 'http://www.japscan.cc' + o.attributes.value),

  imageUrls: (dom) => [dom.querySelector('#image').attributes.src]
}
