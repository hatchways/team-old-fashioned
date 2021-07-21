const socketCookieParser = (str) => {
  if (str) {
    return str
      .split(';')
      .map((c) => c.split('='))
      .reduce((acc, cur) => {
        acc[decodeURIComponent(cur[0].trim())] = decodeURIComponent(cur[1].trim());
        return acc;
      }, {});
  }
  return null;
};

module.exports = socketCookieParser;
