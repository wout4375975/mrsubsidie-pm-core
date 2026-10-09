import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/ui/*.ts", "src/ui/*.tsx"],
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  outDir: "dist",
  sourcemap: true,
  splitting: false,
  treeshake: true,
});
