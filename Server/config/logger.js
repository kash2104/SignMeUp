const Level = {
  access: {
    color: [200, 149, 255],
    writeToFile: true,
  },
  warn: {
    color: "yellow",
    writeToFile: true,
  },
  debug: {
    color: "cyan",
    writeToFile: true,
  },
  system: {
    color: "blue",
    writeToFile: true,
  },
  database: {
    color: "cyanBright",
    writeToFile: true,
  },
  event: {
    color: "magenta",
    writeToFile: true,
  },
  info: {
    color: "green",
    writeToFile: true,
  },
  error: {
    color: "red",
    writeToFile: true,
  },
  fatal: {
    color: "redBright",
    writeToFile: true,
  },
};

module.exports = { Level };
