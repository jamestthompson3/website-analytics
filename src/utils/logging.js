/*
 * MISC UTILS
 */
function cyan(message) {
  return `\x1b[33m${message}\x1b[0m`;
}

function green(message) {
  return `\x1b[32m${message}\x1b[0m`;
}

function magenta(message) {
  return `\x1b[35m${message}\x1b[0m`;
}

module.exports = {
  cyan,
  green,
  magenta
};
