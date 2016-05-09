module.exports = {
  domain: () =>
    "mangareader.net",

  isAjax: () =>
    false,

  acceptsUrl: (url) =>
    !!url.match(/^https?\:\/\/www\.mangareader\.net\/([a-z0-9-]+)\/\d+(\/\d+)?$/i),

  seriesName: (dom) =>
    dom.querySelector("#mangainfo h1").text.replace(/\s+\d+$/, ""),

  chapterNumber: (dom) =>
    parseInt(dom.querySelector("#mangainfo h1").text.match(/\d+$/)[0]),

  pageUrls: (dom) =>
    dom.querySelectorAll("#pageMenu option").map((o) => "http://www.mangareader.net" + o.attributes.value),

  imageUrls: (dom) =>
    [dom.querySelector("#imgholder img").attributes.src]
};