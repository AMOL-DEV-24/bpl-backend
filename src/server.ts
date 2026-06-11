import { setupDNS } from "./config/dns";
setupDNS();

import "dotenv/config";
import chalk from "chalk";
import app from "./app";
import { connectDB } from "./config/db";
import router from "./api/v1/routes";

connectDB();

const PORT = process.env.PORT || 5000;
const BASE = "/api/bpl/v1";

const getRoutes = () => {
  const routes: { method: string; path: string }[] = [];

  router.stack.forEach((middleware: any) => {
    if (!middleware.handle?.stack) return;

    const prefixMatch = middleware.regexp?.source?.match(/\^\\\/([\w-]+)\\\//);
    const prefix = prefixMatch ? prefixMatch[1] : "";

    middleware.handle.stack.forEach((handler: any) => {
      if (!handler.route) return;
      const method = Object.keys(handler.route.methods)[0].toUpperCase();
      const subPath = handler.route.path;
      routes.push({ method, path: `${BASE}/${prefix}${subPath}` });
    });
  });

  return routes;
};

const methodTag = (method: string) => {
  const tags: Record<string, string> = {
    GET:    chalk.bgGreen.black("  GET  "),
    POST:   chalk.bgBlue.white("  POST "),
    PATCH:  chalk.bgYellow.black(" PATCH "),
    DELETE: chalk.bgRed.white(" DELETE"),
    PUT:    chalk.bgMagenta.white("  PUT  "),
  };
  return tags[method] ?? chalk.white(method.padEnd(7));
};

app.listen(PORT, () => {
  const routes = getRoutes();

  console.log(chalk.cyan("\n╔══════════════════════════════════════════════════╗"));
  console.log(chalk.cyan("║") + chalk.bold("           🏏  BPL SERVER STARTED               ") + chalk.cyan("║"));
  console.log(chalk.cyan("╠══════════════════════════════════════════════════╣"));
  console.log(chalk.cyan("║") + `  🚀 Port     : ${chalk.green(PORT)}                            ` + chalk.cyan("║"));
  console.log(chalk.cyan("║") + `  🌍 Env      : ${chalk.yellow(process.env.NODE_ENV ?? "development")}                   ` + chalk.cyan("║"));
  console.log(chalk.cyan("║") + `  📦 Database : ${chalk.green("bpl_db")}                       ` + chalk.cyan("║"));
  console.log(chalk.cyan("║") + `  🔗 Base URL : ${chalk.magenta(BASE)}              ` + chalk.cyan("║"));
  console.log(chalk.cyan("╠══════════════════════════════════════════════════╣"));
  console.log(chalk.cyan("║") + chalk.bold("  📋 ACTIVE SERVICES                              ") + chalk.cyan("║"));
  console.log(chalk.cyan("║") + `  ${chalk.green("✔")}  Payment Service                              ` + chalk.cyan("║"));
  console.log(chalk.cyan("║") + `  ${chalk.green("✔")}  Player Service                               ` + chalk.cyan("║"));
  console.log(chalk.cyan("║") + `  ${chalk.green("✔")}  Upload Service                               ` + chalk.cyan("║"));
  console.log(chalk.cyan("╠══════════════════════════════════════════════════╣"));
  console.log(chalk.cyan("║") + chalk.bold("  🛣️  REGISTERED ROUTES                           ") + chalk.cyan("║"));

  routes.forEach(({ method, path }) => {
    const line = `  ${methodTag(method)}  ${path}`;
    console.log(chalk.cyan("║") + chalk.white(line.padEnd(50)) + chalk.cyan("║"));
  });

  console.log(chalk.cyan("╚══════════════════════════════════════════════════╝\n"));
  console.log(chalk.gray("  Waiting for requests...\n"));
});