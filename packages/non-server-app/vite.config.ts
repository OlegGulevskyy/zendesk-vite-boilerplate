import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//@ts-expect-error
import injectZafHtmlPluginModule from "@app/zendesk/vite-plugin-inject-zaf-html";
const { injectZafHtmlPlugin } = injectZafHtmlPluginModule;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), injectZafHtmlPlugin()],
});
