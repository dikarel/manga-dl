const format = require("util").format;
const assert = require("assert");

module.exports.name = (conf, loadConf) =>
  format("%s should load image URLs from %s", conf.name, loadConf.source);

module.exports.createTest = (conf, loadConf) =>
  (test) => {
    const imageUrls = conf.scraper.imageUrls(loadConf.dom);
    const actualTotalImages = imageUrls.length;
    const expectedTotalImages = loadConf.totalImageUrls;
    const actualFirstImage = imageUrls.length ? imageUrls[0] : null;
    const expectedFirstImage = loadConf.firstImageUrl;
    const actualLastImage = imageUrls.length ? imageUrls[imageUrls.length - 1] : null;
    const expectedLastImage = loadConf.lastImageUrl;

    assert(actualTotalImages == expectedTotalImages,
      format("failed to load image URLs correctly (# images is %s, but should be %s)",
        actualTotalImages, expectedTotalImages));

    assert(actualFirstImage == expectedFirstImage,
      format("failed to load image URLs correctly (first image: %s, but should be %s)",
        actualFirstImage, expectedFirstImage));

    assert(actualLastImage == expectedLastImage,
      format("failed to load image URLs correctly (last image: %s, but should be %s)",
        actualLastImage, expectedLastImage));

    test.done();
  };