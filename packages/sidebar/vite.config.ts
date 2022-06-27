import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	
  // TODO - need to remove ASSETS from built JS files
  base: "./",
	build: {
		outDir: `${process.env.INIT_CWD}/dist/assets/sidebar`
	}
})
