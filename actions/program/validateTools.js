// Ensures that required third-party tools are available in the system
module.exports = (program) => program;

function validatePandocAvailability() {
  return exec("which pandoc", ["-s"])
    .error(() => {
      console.error("Error: You need to install pandoc in your system ");
      process.exit(1);
    });
}