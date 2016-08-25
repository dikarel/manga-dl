module.exports = {
  domain: () => 'mangaeden.com',

  isAjax: () => false,

  acceptsUrl: (url) => !!url.match(/^https?:\/\/(www\.)?mangaeden\.com\/en\/en-manga\/([a-z0-9-]+)\/\d+(\/\d+)?\/?$/i),

  seriesName: (dom) => dom.querySelector('#sbox h3').text.replace(/\s+chapter\s+\d+$/i, ''),

  chapterNumber: (dom) => parseInt(dom.querySelector('#sbox h3').text.match(/\s+chapter\s+(\d+)$/i, '')[1]),

  pageUrls: (dom) => dom
    .querySelectorAll('#pageSelect option')
    .map(o => 'http://www.mangaeden.com' + o.attributes.value),

  imageUrls: (dom) => ['http:' + dom.querySelector('#nextA img').attributes.src]
}
