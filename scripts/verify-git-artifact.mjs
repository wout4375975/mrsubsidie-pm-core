import { execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const requiredFiles = ["dist/index.js", "dist/index.cjs", "dist/index.d.ts"];

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Ontbrekend release-artifact: ${file}`);
  }

  try {
    git(["ls-files", "--error-unmatch", file]);
  } catch {
    throw new Error(`Release-artifact is niet in git opgenomen: ${file}`);
  }
}

const trackedArtifacts = new Set(git(["ls-files", "dist"]).split("\n").filter(Boolean));
const generatedArtifacts = filesIn("dist").map(file => relative(".", file)).sort();
const untrackedArtifacts = generatedArtifacts.filter(file => !trackedArtifacts.has(file));
if (untrackedArtifacts.length > 0) {
  throw new Error(`Nieuwe release-artifacts ontbreken in git:\n${untrackedArtifacts.join("\n")}`);
}

const changedRuntimeArtifacts = git(["diff", "--name-only", "--", "dist"])
  .split("\n")
  .filter(Boolean)
  .filter(file => !file.endsWith(".d.ts") && !file.endsWith(".d.cts"));
if (changedRuntimeArtifacts.length > 0) {
  throw new Error(
    `Runtime-release-artifacts verschillen van de bron. Bouw de package en neem dist/ op in git:\n${changedRuntimeArtifacts.join("\n")}`
  );
}

console.log("Git-release-artifacts gecontroleerd.");
