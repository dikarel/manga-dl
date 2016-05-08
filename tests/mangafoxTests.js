var sampleDom = require("./helpers/getSampleDom")("mangafox");
var mangafox = require("../scrapers/mangafox");
var assert = require("better-assert");

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

exports["mangafox does not use an ajax reader"] = (test) => {
  assert(!mangafox.isAjax());
  test.done();
};

exports["mangafox gets series name"] = (test) => {
  assert(mangafox.seriesName(sampleDom) == "Tonari no Kashiwagi-san");
  test.done();
};

exports["mangafox gets chapter number"] = (test) => {
  assert(mangafox.chapterNumber(sampleDom) === 72);
  test.done();
};

exports["mangafox gets URLs of all pages"] = (test) => {
  var pageUrls = mangafox.pageUrls(sampleDom);
  assert(pageUrls.length == 27);
  assert(pageUrls[0] == "http://mangafox.me/manga/tonari_no_kashiwagi_san/v07/c072/1.html");
  assert(pageUrls[1] == "http://mangafox.me/manga/tonari_no_kashiwagi_san/v07/c072/2.html");
  assert(pageUrls[2] == "http://mangafox.me/manga/tonari_no_kashiwagi_san/v07/c072/3.html");
  test.done();
};

exports["mangafox gets image URLs"] = (test) => {
  var imageUrls = mangafox.imageUrls(sampleDom);
  assert(imageUrls.length == 1);
  assert(imageUrls[0] == "http://z.mfcdn.net/store/manga/8715/07-072.0/compressed/q001.jpg");
  test.done();
};