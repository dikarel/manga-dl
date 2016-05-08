module.exports = {
  domain: () =>
    "dynasty-scans.com",

  isAjax: () =>
    true,

  acceptsUrl: (url) =>
    url.match(/^http\:\/\/(www\.)?dynasty-scans\.com\/chapters\/([a-z0-9_]+)(#.+)?$/i),

  seriesName: (dom) =>
    dom.querySelector("#chapter-title").text.replace(/ ch\d+ by .+$/, ""),

  chapterNumber: (dom) =>
    parseInt(dom.querySelector("#chapter-title").text.match(/ch(\d+) by .+$/)[1]),

  pageUrls: (dom) =>
    [],

  imageUrls: (dom) =>
    JSON.parse(
      dom.querySelectorAll("script")
      .filter((j) => j.text.match(/var pages = (\[.+\]);/i))[0]
      .text.match(/var pages = (\[.+\]);/i)[1]
    ).map((e) => "http://www.dynasty-scans.com" + e.image)
};