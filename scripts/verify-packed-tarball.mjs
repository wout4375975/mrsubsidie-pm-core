import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const artifactsDirectory = ".artifacts";
const archives = readdirSync(artifactsDirectory).filter(file => file.endsWith(".tgz"));
assert.equal(archives.length, 1, "Verwacht precies één npm-tarball.");

const archive = join(artifactsDirectory, archives[0]);
const files = execFileSync("tar", ["-tzf", archive], { encoding: "utf8" }).split("\n");
for (const expected of [
  "package/package.json",
  "package/dist/index.js",
  "package/dist/index.cjs",
  "package/dist/index.d.ts",
  "package/README.md",
  "package/CHANGELOG.md",
  "package/MIGRATION.md",
]) {
  assert.equal(files.includes(expected), true, `Ontbrekend tarballbestand: ${expected}`);
}

assert.equal(
  files.some(file => /(^|\/)\.npmrc$|\.env(?:\.|$)/.test(file)),
  false,
  "De package mag geen registry- of omgevingsgeheimen bevatten."
);

console.log(`Tarball gecontroleerd: ${archive}`);
