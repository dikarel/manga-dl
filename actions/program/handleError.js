const packageJson = require('../../package')
const format = require('util').format

// Display error messages (if any)
module.exports = (err) => {
  if (!err) return

  console.error(err.stack)
  console.error(format('Report issues at %s', packageJson.bugs.url))

  process.exit(1)
}
