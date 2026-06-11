import chalk from "chalk";
import router from "../api/v1/routes";

const BASE = "/api/bpl/v1";

export const getRoutes = () => {
  const routes: { method: string; path: string }[] = [];

  try {
    router.stack.forEach((layer: any) => {
      if (!layer?.route) return;

      const methodKeys = Object.keys(layer.route.methods || {});
      const method = methodKeys.length
        ? methodKeys[0].toUpperCase()
        : "UNKNOWN";

      const path = layer.route.path || "";

      routes.push({
        method,
        path: `${BASE}${path}`,
      });
    });
  } catch (err) {
    console.log(chalk.red("Route extraction failed"), err);
  }

  return routes;
};

export { BASE };