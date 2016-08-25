module.exports = {
  domain: () => 'mangapark.me',

  isAjax: () => false,

  acceptsUrl: (url) => url.match(/^https?:\/\/(www\.)?mangapark\.me\/manga\/([a-z0-9-]+)\/s\d+\/c\d+(\/\d+)?(\/|(\.html))?$/i),

  seriesName: (dom) => dom.querySelector('#img-1').attributes.title.replace(/\s+ch\.\d+.*$/, ''),

  chapterNumber: (dom) => parseInt(dom.querySelector('#img-1').attributes.title.match(/\s+ch\.(\d+).*$/, '')[1]),

  pageUrls: (dom) => dom.querySelectorAll('.board .info a')
    .filter(a => a.text.match(/^\d+$/))
    .map(a => 'http://mangapark.me' + a.attributes.href),

  imageUrls: (dom) => [dom.querySelector('#img-1').attributes.src]
}
