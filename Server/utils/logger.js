const { Level } = require("../config/logger");
const path = require("path");
const moment = require("moment");
const chalk = require("chalk");

const {
  existsSync,
  mkdir,
  appendFileSync,
  createReadStream,
  mkdirSync,
} = require("fs");
const readline = require("readline");

// options can be level, message, error
const log = (options) => {
  const levelName = getLevelName(options.level);

  //   console.log(levelName);

  let message = options.message ?? "Unidentified error";
  //   console.log(message);

  const error = options.error ?? null;

  writeToConsole(levelName, message, error);

  if (Level[levelName].writeToFile) {
    writeToFile(levelName, message, error);
  }
};

const getLevelName = (level) => {
  return level && Level.hasOwnProperty(level) ? level : "info";
};

const writeToConsole = (levelName, message, error = null) => {
  const level = Level[levelName];

  let chalkFunction = null;

  if (level.color.includes("#")) {
    chalkFunction(chalk.hex(level.color));
  } else if (Array.isArray(level.color)) {
    if (level.color.length === 3) {
      chalkFunction = chalk.rgb(level.color[0], level.color[1], level.color[2]);
    } else {
      throw new Error(
        `We've detected that the configruation for the logger level ${chalk.red(
          `[${level.toUpperCase()}]`
        )} is set for RGB but only has ${chalk.red(
          `${level.color.length}`
        )} values.\n The configuration must be an ${chalk.red(
          `array`
        )} and contain ${chalk.red(`3`)} values.`
      );
    }
  } else {
    chalkFunction = chalk[level.color];
  }

  message = error
    ? `${chalkFunction(`${error.message} \n ${error.stack}`)}`
    : message;

  const header = `[${getFormattedCurrentDate()}] [${levelName.toUpperCase()}]`;

  console.log(`${chalkFunction(header)}: ${chalkFunction(message)}`);
};
const getFormattedCurrentDate = () => {
  return moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
};

const writeToFile = (level, message) => {
  const logsDir = "../logs";

  const data = `{
        'level': '${level.toUpperCase()}',
        'message': '${message}',
        'timestamp': '${getFormattedDate()}',
    }\r \n`;

  if (!existsSync(logsDir)) {
    mkdirSync(logsDir);
  }

  const options = {
    encoding: "utf8",
    mode: 438,
  };

  appendFileSync(`../logs/${level}.log`, data, options);
};

const readLog = async (fileName = null) => {
  const logDir = "../logs";

  return new Promise((resolve, reject) => {
    const file = path.join(
      logDir,
      fileName.includes(".") ? fileName : `${fileName}.log`
    );

    const lineReader = readline.createInterface({
      input: createReadStream(file),
    });

    // array of objects
    const logs = [];

    lineReader.on("line", (line) => {
      logs.push(JSON.parse(line));
    });

    lineReader.on("close", () => {
      console.log(
        chalk.yellow(`${fileName.toUpperCase()} logs have been accessed`)
      );

      console.table(logs);

      resolve(logs);
    });

    lineReader.on("error", (error) => {
      reject(error);
    });
  });
};

const getFormattedDate = () => {
  return moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
};

const info = (message) => {
  log({ level: "info", message });
};

const warn = (message) => {
  log({ level: "warn", message });
};

const debug = (message) => {
  log({ level: "debug", message });
};

const system = (message) => {
  log({ level: "system", message });
};

const database = (message) => {
  log({ level: "database", message });
};

const event = (message) => {
  log({ level: "event", message });
};

const error = (error) => {
  if (typeof error === "string") {
    log({ level: "error", message: error });
  } else {
    log({ level: "error", error });
  }
};

const fatal = (error) => {
  if (typeof error === "string") {
    log({ level: "fatal", message: error });
  } else {
    log({ level: "fatal", error });
  }
};

module.exports = {
  log,
  readLog,
  info,
  warn,
  debug,
  system,
  database,
  event,
  error,
  fatal,
  writeToConsole,
  writeToFile,
};
