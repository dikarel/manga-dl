module.exports = {
  domain: () => {
    return "mangareader.net";
  },

  acceptsUrl: (url) => {
    return !!url.match(/^http\:\/\/www\.mangareader\.net\/([a-z0-9-]+)\/\d+(\/\d+)?$/i);
  },

  seriesName: (dom) => {
    return dom.querySelector("#mangainfo h1").text.replace(/\s+\d+$/, "");
  },

  chapterNumber: (dom) => {
    return parseInt(dom.querySelector("#mangainfo h1").text.match(/\d+$/)[0]);
  },

  pageUrls: (dom) => {
    return dom.querySelectorAll("#pageMenu option").map((o) => "http://www.mangareader.net" + o.attributes.value);
  },

  imageUrl: (dom) => {
    return dom.querySelector("#imgholder img").attributes.src;
  }
};