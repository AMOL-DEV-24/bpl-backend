import chalk from "chalk";
import { getRoutes, BASE } from "./getRoutes";
import { methodTag } from "./methodTag";

export const printServerBanner = (port: string | number) => {
  const routes = getRoutes();

  console.log(chalk.cyan("\n╔══════════════════════════════════════════════════╗"));
  console.log(
    chalk.cyan("║") +
      chalk.bold("           🏏  BPL SERVER STARTED               ") +
      chalk.cyan("║")
  );

  console.log(chalk.cyan("╠══════════════════════════════════════════════════╣"));

  console.log(
    chalk.cyan("║") +
      `  🚀 Port     : ${chalk.green(port.toString().padEnd(10))}` +
      chalk.cyan("║")
  );

  console.log(
    chalk.cyan("║") +
      `  🌍 Env      : ${chalk.yellow(
        process.env.NODE_ENV || "development"
      ).padEnd(15)}` +
      chalk.cyan("║")
  );

  console.log(
    chalk.cyan("║") +
      `  🔗 Base URL : ${chalk.magenta(BASE).padEnd(20)}` +
      chalk.cyan("║")
  );

  console.log(chalk.cyan("╠══════════════════════════════════════════════════╣"));
  console.log(chalk.cyan("║") + chalk.bold("  📋 ACTIVE MODULES                             ") + chalk.cyan("║"));

  console.log(chalk.cyan("║") + `  ✔ Player Service                               ` + chalk.cyan("║"));
  console.log(chalk.cyan("║") + `  ✔ Payment Service                              ` + chalk.cyan("║"));
  console.log(chalk.cyan("║") + `  ✔ Upload Service                               ` + chalk.cyan("║"));

  console.log(chalk.cyan("╠══════════════════════════════════════════════════╣"));
  console.log(chalk.cyan("║") + chalk.bold("  🛣️ ROUTES                                      ") + chalk.cyan("║"));

  if (!routes.length) {
    console.log(chalk.cyan("║") + chalk.gray("  No routes found                               ") + chalk.cyan("║"));
  } else {
    routes.forEach(({ method, path }) => {
      const line = `  ${methodTag(method)}  ${path}`;

      console.log(
        chalk.cyan("║") +
          chalk.white(line.padEnd(50)) +
          chalk.cyan("║")
      );
    });
  }

  console.log(chalk.cyan("╚══════════════════════════════════════════════════╝"));
  console.log(chalk.gray("\n  🚀 Server ready for requests...\n"));
};