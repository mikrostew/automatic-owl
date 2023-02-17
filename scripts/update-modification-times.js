import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { extname, parse, sep } from "node:path";

const EXTS_TO_INCLUDE = [".md", ".njk"];
const DIRS_TO_IGNORE = ["_layouts"];

const execFilePromise = promisify(execFile);

async function last20Commits() {
  const { stdout } = await execFilePromise("git", ["rev-list", "-n20", "HEAD"]);
  return stdout.trim().split("\n");
}

async function filesModifiedInCommit(commitSha) {
  const { stdout } = await execFilePromise("git", [
    "diff-tree",
    "--no-commit-id",
    "--name-only",
    "-r",
    commitSha,
  ]);
  return stdout.trim().split("\n");
}

function shouldIncludeFile(file) {
  if (EXTS_TO_INCLUDE.includes(extname(file))) {
    const dirs = parse(file).dir.split(sep);
    for (const dir of dirs) {
      if (DIRS_TO_IGNORE.includes(dir)) {
        return false;
      }
    }
    return true;
  }
  return false;
}

const lastCommits = await last20Commits();

for (const commit of lastCommits) {
  const modifiedFiles = await filesModifiedInCommit(commit);
  for (const file of modifiedFiles) {
    if (shouldIncludeFile(file)) {
      console.log("(update)", file, commit);
    }
  }
}
