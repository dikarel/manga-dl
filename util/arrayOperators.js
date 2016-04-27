module.exports = {
  truthy: truthy,
  trim: trim
};

function truthy(obj) {
  return !!obj;
}

function trim(str) {
  return str.trim();
}