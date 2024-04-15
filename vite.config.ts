import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
// https://github.com/cornerstonejs/cornerstone3D/issues/1071 current workaround for bug with vite and Cornerstone3D tools when build
export default defineConfig({
  plugins: [vue(), wasm()],
  resolve: {
    alias: {
      "@cornerstonejs/tools": "@cornerstonejs/tools/dist/umd/index.js",
    },
  },
  worker: {
    plugins() {
      return [wasm()];
    },
  },
});
