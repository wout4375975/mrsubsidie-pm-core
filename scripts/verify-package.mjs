import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const requiredFiles = ["dist/index.js", "dist/index.cjs", "dist/index.d.ts"];
for (const file of requiredFiles) {
  assert.equal(existsSync(file), true, `Ontbrekend buildbestand: ${file}`);
}

const packageManifest = JSON.parse(readFileSync("package.json", "utf8"));
assert.equal(packageManifest.name, "@wout4375975/mrsubsidie-pm-core");
assert.equal(packageManifest.version, "0.1.0");
assert.equal(packageManifest.private, false);
assert.equal(
  packageManifest.publishConfig?.registry,
  "https://npm.pkg.github.com"
);

const npmrc = readFileSync(".npmrc", "utf8");
assert.match(npmrc, /@wout4375975:registry=https:\/\/npm\.pkg\.github\.com/);
assert.doesNotMatch(npmrc, /_authToken|NPM_PUBLISH_TOKEN|ghp_|github_pat_/i);

const esmPackage = await import(pathToFileURL(resolve("dist/index.js")).href);
const require = createRequire(import.meta.url);
const cjsPackage = require(resolve("dist/index.cjs"));
assert.deepEqual(Object.keys(esmPackage), []);
assert.deepEqual(Object.keys(cjsPackage), []);

console.log("Package-build en veilige registryconfiguratie zijn gevalideerd.");
