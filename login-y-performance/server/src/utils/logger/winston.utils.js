import { createLogger, format, transports, addColors } from "winston";
const { colorize, simple } = format;

const levels = { ERROR: 0, FATAL: 1, INFO: 2, HTTP: 3 };
const colors = { HTTP: "green", INFO: "blue", ERROR: "red", FATAL: "yellow" };
addColors(colors);

export default createLogger({
  levels,
  format: colorize(),
  transports: [
    new transports.Console({ level: "HTTP", format: simple() }),
    new transports.File({
      level: "WARN",
      format: simple(),
      filename: "./src/utils/errors/errors.log",
    }),
  ],
});
