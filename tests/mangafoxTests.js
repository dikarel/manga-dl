var mangafox = require("../scrapers/mangafox");
var readFile = require("fs").readFileSync;
var assert = require("better-assert");
var join = require("path").join;
var parseHtml = require("fast-html-parser").parse;
var sampleDom = parseHtml(readFile(join(__dirname, "data", "mangafox.html"), "utf8"));

exports["mangafox accepts valid reader URLs"] = (test) => {
  assert(mangafox.acceptsUrl("http://mangafox.me/manga/tonari_no_kashiwagi_san/v07/c072/"));
  assert(mangafox.acceptsUrl("http://mangafox.me/manga/tonari_no_kashiwagi_san/v07/c072"));
  assert(mangafox.acceptsUrl("http://mangafox.me/manga/tonari_no_kashiwagi_san/v07/c072/1.html"));
  assert(mangafox.acceptsUrl("http://mangafox.me/manga/blazing_ninjaman/v03/c033/55.html"));
  assert(mangafox.acceptsUrl("http://mangafox.me/manga/dokgo/c027/1.html"));
  test.done();
};

exports["mangafox rejects invalid URLs"] = (test) => {
  assert(!mangafox.acceptsUrl("http://mangafox.me/manga/dokgo/"));
  assert(!mangafox.acceptsUrl("http://mangafox.me"));
  assert(!mangafox.acceptsUrl("http://mangafox.me/manga/blazing_ninjaman/v04"));
  test.done();
};

exports["mangafox gets series name"] = (test) => {
  assert(mangafox.seriesName(sampleDom) == "Tonari no Kashiwagi-san");
  test.done();
};

exports["mangafox gets chapter number"] = (test) => {
  assert(mangafox.chapterNumber(sampleDom) == 72);
  test.done();
};

exports["mangafox gets URLs of all pages"] = (test) => {
  var pages = mangafox.pageUrls(sampleDom);
  assert(pages.length == 27);
  assert(pages[0] == "http://mangafox.me/manga/tonari_no_kashiwagi_san/v07/c072/1.html");
  assert(pages[1] == "http://mangafox.me/manga/tonari_no_kashiwagi_san/v07/c072/2.html");
  assert(pages[2] == "http://mangafox.me/manga/tonari_no_kashiwagi_san/v07/c072/3.html");
  test.done();
};

exports["mangafox gets image url"] = (test) => {
  assert(mangafox.imageUrl(sampleDom) == "http://z.mfcdn.net/store/manga/8715/07-072.0/compressed/q001.jpg");
  test.done();
};