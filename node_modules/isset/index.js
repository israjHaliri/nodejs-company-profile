module.exports = function isset(string) {
  if (typeof string === 'undefined' || string === null || string.length === 0) {
    return false;
  } else {
    return true;
  }
};
