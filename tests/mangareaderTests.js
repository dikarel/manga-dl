var sampleDom = require("./helpers/getSampleDom")("mangareader");
var mangareader = require("../scrapers/mangareader");
var assert = require("better-assert");

exports["mangareader accepts valid reader URLs"] = (test) => {
  assert(mangareader.acceptsUrl("http://www.mangareader.net/red-string-dong-bi/1"));
  assert(mangareader.acceptsUrl("http://www.mangareader.net/i-dont-want-this-kind-of-hero/9"));
  assert(mangareader.acceptsUrl("http://www.mangareader.net/space-time-prisoner/1"));
  assert(mangareader.acceptsUrl("http://www.mangareader.net/space-time-prisoner/19"));
  assert(mangareader.acceptsUrl("http://www.mangareader.net/space-time-prisoner/19/2"));
  assert(mangareader.acceptsUrl("http://www.mangareader.net/space-time-prisoner/193/255"));
  test.done();
};

exports["mangareader rejects invalid URLs"] = (test) => {
  assert(!mangareader.acceptsUrl("http://www.mangareader.net/space-time-prisoner"));
  assert(!mangareader.acceptsUrl("http://mangafox.me"));
  test.done();
};

exports["mangareader does not use an ajax reader"] = (test) => {
  assert(!mangareader.isAjax());
  test.done();
};

exports["mangareader gets series name"] = (test) => {
  assert(mangareader.seriesName(sampleDom) == "Red String (Dong Bi)");
  test.done();
};

exports["mangareader gets chapter number"] = (test) => {
  assert(mangareader.chapterNumber(sampleDom) === 1);
  test.done();
};

exports["mangareader gets URLs of all pages"] = (test) => {
  var pageUrls = mangareader.pageUrls(sampleDom);
  assert(pageUrls.length == 34);
  assert(pageUrls[0] == "http://www.mangareader.net/red-string-dong-bi/1");
  assert(pageUrls[1] == "http://www.mangareader.net/red-string-dong-bi/1/2");
  assert(pageUrls[2] == "http://www.mangareader.net/red-string-dong-bi/1/3");
  test.done();
};

exports["mangareader gets image URLs"] = (test) => {
  var imageUrls = mangareader.imageUrls(sampleDom);
  assert(imageUrls.length == 1);
  assert(imageUrls[0] == "http://i9.mangareader.net/red-string-dong-bi/1/red-string-dong-bi-5086327.jpg");
  test.done();
};