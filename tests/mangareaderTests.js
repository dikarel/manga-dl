var mangareader = require("../scrapers/mangareader");
var readFile = require("fs").readFileSync;
var assert = require("better-assert");
var join = require("path").join;
var parseHtml = require("fast-html-parser").parse;
var sampleDom = parseHtml(readFile(join(__dirname, "data", "mangareader.html"), "utf8"));

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

exports["mangareader gets series name"] = (test) => {
  assert(mangareader.seriesName(sampleDom) == "Red String (Dong Bi)");
  test.done();
};

exports["mangareader gets chapter number"] = (test) => {
  assert(mangareader.chapterNumber(sampleDom) == 1);
  test.done();
};

exports["mangareader gets URLs of all pages"] = (test) => {
  var pages = mangareader.pageUrls(sampleDom);
  assert(pages.length == 34);
  assert(pages[0] == "http://www.mangareader.net/red-string-dong-bi/1");
  assert(pages[1] == "http://www.mangareader.net/red-string-dong-bi/1/2");
  assert(pages[2] == "http://www.mangareader.net/red-string-dong-bi/1/3");
  test.done();
};

exports["mangareader gets image url"] = (test) => {
  assert(mangareader.imageUrl(sampleDom) == "http://i9.mangareader.net/red-string-dong-bi/1/red-string-dong-bi-5086327.jpg");
  test.done();
};