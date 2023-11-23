import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

import pkg from "@app/zendesk/vite-plugin-inject-zaf-html";

export default defineConfig({
  plugins: [solid(), pkg.injectZafHtmlPlugin()],
  base: "./",
  server: {
    port: 3000,
  },
  build: {
    outDir: `${process.env.INIT_CWD}/dist/assets/${process.env.ADDON_TYPE}`,
    emptyOutDir: true,
  },
});
