import chalk from "chalk";

export const methodTag = (method: string) => {
  const tags: Record<string, string> = {
    GET: chalk.bgGreen.black(" GET "),
    POST: chalk.bgBlue.white(" POST "),
    PATCH: chalk.bgYellow.black(" PATCH "),
    DELETE: chalk.bgRed.white(" DELETE "),
    PUT: chalk.bgMagenta.white(" PUT "),
  };

  return tags[method] || chalk.white(method.padEnd(6));
};