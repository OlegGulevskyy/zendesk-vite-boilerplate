import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as pluginPkg from '@app/zendesk/vite-plugin-inject-zaf-html/index.js'
const { injectZafHtmlPlugin } = pluginPkg.default

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), injectZafHtmlPlugin()]
})
