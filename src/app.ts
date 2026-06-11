import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import chalk from "chalk";

import routes from "./api/v1/routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// ✅ Live request logger
app.use(
  morgan((tokens, req, res) => {
    const method = tokens.method(req, res) ?? "";
    const url = tokens.url(req, res) ?? "";
    const status = Number(tokens.status(req, res));
    const time = tokens["response-time"](req, res) ?? "";

    const methodColor: Record<string, string> = {
      GET:    chalk.bgGreen.black("  GET  "),
      POST:   chalk.bgBlue.white("  POST "),
      PATCH:  chalk.bgYellow.black(" PATCH "),
      DELETE: chalk.bgRed.white(" DELETE"),
      PUT:    chalk.bgMagenta.white("  PUT  "),
    };

    const statusColor =
      status >= 500 ? chalk.red(status) :
      status >= 400 ? chalk.yellow(status) :
      status >= 300 ? chalk.cyan(status) :
                      chalk.green(status);

    return [
      chalk.gray(new Date().toLocaleTimeString("en-IN")),
      methodColor[method] ?? chalk.white(method),
      chalk.white(url.padEnd(40)),
      statusColor,
      chalk.gray(`${time} ms`),
    ].join("  ");
  })
);

app.use("/api/bpl/v1", routes);

export default app;