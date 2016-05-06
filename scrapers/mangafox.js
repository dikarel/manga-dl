module.exports = {
  acceptsUrl: url => {
    return !!url.match(/^http\:\/\/(www\.)?mangafox\.me\/manga\/([a-z0-9_]+)(\/v\d+)?\/c\d+\/?(\d+\.html)?$/i);
  },

  seriesName: dom => {
    return dom.querySelector("#series h1").text.replace(/\s+\d+$/, "");
  },

  chapterNumber: dom => {
    return parseInt(dom.querySelector("#series h1").text.match(/\d+$/)[0]);
  },

  pageUrls: dom => {
    var urlTemplate = dom.querySelector("#tip a").attributes.href.replace(/\d+\.html$/, "");

    // Only select numeric page options
    return dom.querySelectorAll("#bottom_bar select.m option")
      .filter(o => o.text.match(/^\d+$/))
      .map(o => urlTemplate + o.attributes.value + ".html");
  },

  imageUrl: (dom) => {
    return dom.querySelector("#viewer img").attributes.src;
  }
};