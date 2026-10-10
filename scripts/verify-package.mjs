import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const uiEntries = [
  "avatar",
  "badge",
  "button",
  "card",
  "dialog",
  "dropdown-menu",
  "label",
  "scroll-area",
  "select",
  "separator",
  "sheet",
  "skeleton",
  "toggle",
  "tooltip",
  "utils",
];
const requiredFiles = [
  "dist/index.js",
  "dist/index.cjs",
  "dist/index.d.ts",
  ...uiEntries.flatMap(entry => [
    `dist/ui/${entry}.js`,
    `dist/ui/${entry}.cjs`,
    `dist/ui/${entry}.d.ts`,
  ]),
];
for (const file of requiredFiles) {
  assert.equal(existsSync(file), true, `Ontbrekend buildbestand: ${file}`);
}

const packageManifest = JSON.parse(readFileSync("package.json", "utf8"));
assert.equal(packageManifest.name, "@wout4375975/mrsubsidie-pm-core");
assert.equal(packageManifest.version, "0.2.0");
assert.equal(packageManifest.private, false);
assert.equal(packageManifest.publishConfig, undefined);
for (const entry of uiEntries) {
  assert.ok(packageManifest.exports[`./ui/${entry}`]);
}

assert.equal(existsSync(".npmrc"), false, "De core gebruikt geen npm-registryconfiguratie.");

const esmRootPackage = await import(pathToFileURL(resolve("dist/index.js")).href);
const require = createRequire(import.meta.url);
const cjsRootPackage = require(resolve("dist/index.cjs"));
assert.deepEqual(Object.keys(esmRootPackage), []);
assert.deepEqual(Object.keys(cjsRootPackage), []);

const esmBadgePackage = await import(
  pathToFileURL(resolve("dist/ui/badge.js")).href
);
const cjsBadgePackage = require(resolve("dist/ui/badge.cjs"));
const esmUtilsPackage = await import(
  pathToFileURL(resolve("dist/ui/utils.js")).href
);
assert.equal(typeof esmBadgePackage.Badge, "function");
assert.equal(typeof esmBadgePackage.badgeVariants, "function");
assert.equal(typeof cjsBadgePackage.Badge, "function");
assert.equal(typeof esmUtilsPackage.cn, "function");

console.log("Package-build, UI-ingangen en tokenloze gitdistributie zijn gevalideerd.");
