module.exports = search;

function search(intent, done) {
  var searchUrl = "https://bato.to/search?name=" + encodeURIComponent(intent.title);

  require("unirest").get(searchUrl, function(response, error) {
    if (error) return done(error);
    if (response.status === 0) return done(new Error("Failed to connect to bato.to (check your connection)"));
    if (response.status != 200) return done(new Error("bato.to did not respond properly (HTTP " + response.status + ")"));

    var html = require("fast-html-parser").parse(response.body);
    var mangas = parseMangas(html);
    displayResults(mangas);
    done();
  });
}

function displayResults(mangas) {
  var table = require("text-table");
  var resultsTable = table(mangas.map(function(manga) {
    return [
      manga.title,
      manga.author
    ];
  }));

  console.log();
  console.log(resultsTable);
}

function parseMangas(html) {
  var chapterRows = html.querySelectorAll(".chapters_list tr");
  var op = require("../util/arrayOperators");

  return chapterRows.map(function(row) {
    var columns = row.querySelectorAll("td");
    if (columns.length < 2) return;

    return {
      title: columns[0].text.trim(),
      author: columns[1].text.trim()
    };
  }).filter(op.truthy);
}
