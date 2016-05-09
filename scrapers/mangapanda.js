module.exports = {
  domain: () =>
    "mangapanda.com",

  isAjax: () =>
    false,

  acceptsUrl: (url) =>
    url.match(/^https?\:\/\/(www\.)?mangapanda\.com\/([a-z0-9-]+)\/\d+(\/\d+)?$/i),

  seriesName: (dom) =>
    dom.querySelector("#mangainfo h1").text.replace(/\s+\d+$/, ""),

  chapterNumber: (dom) =>
    parseInt(dom.querySelector("#mangainfo h1").text.match(/\s+(\d+)$/, "")[1]),

  pageUrls: (dom) =>
    dom.querySelectorAll("#pageMenu option")
    .map(o => "http://www.mangapanda.com" + o.attributes.value),

  imageUrls: (dom) =>
    [dom.querySelector("#img").attributes.src]
};