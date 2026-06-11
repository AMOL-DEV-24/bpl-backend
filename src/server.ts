import { setupDNS } from "./config/dns";
setupDNS();

import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/db";
import { printServerBanner } from "./utils/printBanner";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  printServerBanner(PORT);
});