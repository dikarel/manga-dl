const format = require("util").format;
const Promise = require("bluebird");
const maxRedirects = 5;

const needleHead = Promise.promisify(require("needle").head);

// Performs a HTTP HEAD call that follows redirection; returns a promise
module.exports = (url) => httpHead(url, 1);

function httpHead(url, recursionLevel) {
  if (recursionLevel > maxRedirects) throw new Error(format("Failed to get header from %s (too many redirects)", url));

  return needleHead(url)
    .then((res) => {
      if (isRedirectStatusCode(res.statusCode)) return httpHead(res.headers.location, recursionLevel + 1);
      if (res.statusCode != 200) throw new Error(format("Failed to get header from %s (HTTP %s)", url, res.statusCode));
      return res;
    });
}

function isRedirectStatusCode(statusCode) {
  return statusCode >= 300 && statusCode <= 308;
}