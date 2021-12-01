/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ["es-CL"],
    defaultLocale: "es-CL",
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});