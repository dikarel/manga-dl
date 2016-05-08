var sampleDom = require("./helpers/getSampleDom")("dynastyscans");
var dynastyscans = require("../scrapers/dynastyscans");
var assert = require("better-assert");

exports["dynastyscans accepts valid reader URLs"] = (test) => {
  assert(dynastyscans.acceptsUrl("http://dynasty-scans.com/chapters/a_room_for_two_ch05#11"));
  assert(dynastyscans.acceptsUrl("http://dynasty-scans.com/chapters/a_room_for_two_ch05"));
  assert(dynastyscans.acceptsUrl("http://dynasty-scans.com/chapters/mahou_shoujo_lyrical_nanoha_innocent_intermission_02#9"));
  test.done();
};

exports["dynastyscans rejects invalid URLs"] = (test) => {
  assert(!dynastyscans.acceptsUrl("http://dynasty-scans.com/chapters"));
  assert(!dynastyscans.acceptsUrl("http://dynasty-scans.com/series"));
  assert(!dynastyscans.acceptsUrl("http://dynasty-scans.com/series/girls_monochrome"));
  test.done();
};
exports["dynastyscans uses an ajax reader"] = (test) => {
  assert(dynastyscans.isAjax());
  test.done();
};

exports["dynastyscans gets series name"] = (test) => {
  assert(dynastyscans.seriesName(sampleDom) == "A Room For Two");
  test.done();
};

exports["dynastyscans gets chapter number"] = (test) => {
  assert(dynastyscans.chapterNumber(sampleDom) === 6);
  test.done();
};

exports["dynastyscans does not return page URLs"] = (test) => {
  var pageUrls = dynastyscans.pageUrls(sampleDom);
  assert(pageUrls.length === 0);
  test.done();
};

exports["dynastyscans gets image URLs"] = (test) => {
  var imageUrls = dynastyscans.imageUrls(sampleDom);
  assert(imageUrls.length == 12);
  assert(imageUrls[0] == "http://www.dynasty-scans.com/system/releases/000/015/674/01.png");
  assert(imageUrls[1] == "http://www.dynasty-scans.com/system/releases/000/015/674/02.png");
  assert(imageUrls[2] == "http://www.dynasty-scans.com/system/releases/000/015/674/03.png");
  test.done();
};