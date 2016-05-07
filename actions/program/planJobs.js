// Get a list of jobs to do, based on command line args; this is then stored inside program.jobs
module.exports = (program) => {
  program.jobs = program.args
    .map(sanitizeUrl)
    .filter((u) => u)
    .map((url) => {
      return {
        url: url,
        scraper: program.scrapers.filter((s) => s.acceptsUrl(url))[0],
        convertPagesToEpub: (program.format == "mobi" || program.format == "epub"),
        convertEpubToMobi: (program.format == "mobi"),
        parallelism: program.parallelism
      };
    });

  return program;
};

function sanitizeUrl(orig) {
  if (!orig) return orig;
  return (orig.match(/https?\:\/\//i) ? orig : "http://" + orig).trim();
}