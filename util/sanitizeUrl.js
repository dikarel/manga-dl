module.exports = (orig) => {
  if (!orig) return orig;
  return (orig.match(/https?\:\/\//i) ? orig : "http://" + orig).trim();
};