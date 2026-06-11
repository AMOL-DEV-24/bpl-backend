import morgan from "morgan";
import chalk from "chalk";

export const httpLogger = morgan((tokens, req, res) => {
  const method = tokens.method(req, res) ?? "";
  const url = tokens.url(req, res) ?? "";
  const status = Number(tokens.status(req, res));
  const responseTime = tokens["response-time"](req, res) ?? "0";

  const methodColor: Record<string, string> = {
    GET: chalk.bgGreen.black("  GET  "),
    POST: chalk.bgBlue.white(" POST "),
    PATCH: chalk.bgYellow.black(" PATCH "),
    PUT: chalk.bgMagenta.white("  PUT  "),
    DELETE: chalk.bgRed.white(" DELETE "),
  };

  const statusColor =
    status >= 500
      ? chalk.red(status)
      : status >= 400
      ? chalk.yellow(status)
      : status >= 300
      ? chalk.cyan(status)
      : chalk.green(status);

  return [
    chalk.gray(new Date().toLocaleTimeString("en-IN")),
    methodColor[method] ?? chalk.bgWhite.black(method),
    chalk.white(url.padEnd(50)),
    statusColor,
    chalk.gray(`${responseTime} ms`),
  ].join(" ");
});