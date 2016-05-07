var Promise = require("bluebird");
var join = require("path").join;

var readdir = Promise.promisify(require("fs").readdir);

// Import scraper libs, placing them in program.scrapers
module.exports = (program) => {
  var scraperDir = join(__dirname, "..", "..", "scrapers");

  return readdir(scraperDir)
    .then((jsFilenames) => {
      program.scrapers = jsFilenames.map((filename) =>
        require(join(scraperDir, filename))
      );

      return program;
    });
};