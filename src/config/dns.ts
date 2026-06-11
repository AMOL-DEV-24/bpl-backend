import dns from "dns";

/**
 * DNS Configuration
 * Forces Google DNS (8.8.8.8) to bypass router/ISP DNS restrictions
 * Required for MongoDB Atlas SRV record resolution on restricted networks
 */

export const setupDNS = (): void => {
  dns.setServers([
    "8.8.8.8",        // Google Primary DNS
    "8.8.4.4",        // Google Secondary DNS
    "2001:4860:4860::8888", // Google Primary IPv6
    "2001:4860:4860::8844", // Google Secondary IPv6
  ]);

  console.log("🌐 DNS configured → Google DNS (8.8.8.8)");
};