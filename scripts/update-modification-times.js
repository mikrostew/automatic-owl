import { promisify } from 'node:util';
import { execFile } from 'node:child_process';
import { extname, join, parse, sep } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

const EXTS_TO_INCLUDE = ['.md', '.njk', '.html'];
const DIRS_TO_IGNORE = ['_layouts'];
const FILES_TO_IGNORE = ['README.md'];

const execFilePromise = promisify(execFile);

// TODO: I should convert this to TS

async function getPrevCommitInfo(numCommits) {
  const { stdout } = await execFilePromise('git', [
    'log',
    '-n',
    numCommits,
    '--format=%H %ct',
    'HEAD',
  ]);
  // each line is '<commit-hash> <timestamp>'
  const commitInfos = stdout
    .trim()
    .split('\n')
    .map((line) => {
      const [hash, timestamp] = line.split(' ');
      return { hash, timestamp: parseInt(timestamp) };
    });
  return commitInfos;
}

async function filesModifiedInCommit(commitSha) {
  const { stdout } = await execFilePromise('git', [
    'diff-tree',
    '--no-commit-id',
    '--name-only',
    '-r',
    commitSha,
  ]);
  return stdout.trim().split('\n');
}

function shouldIncludeFile(file) {
  if (EXTS_TO_INCLUDE.includes(extname(file))) {
    if (FILES_TO_IGNORE.includes(file)) {
      return false;
    }
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

async function getFileRevisions(commitInfos) {
  let fileRevisions = {};
  for (const commit of commitInfos) {
    const modifiedFiles = await filesModifiedInCommit(commit.hash);
    for (const file of modifiedFiles) {
      if (shouldIncludeFile(file)) {
        if (fileRevisions[file] === undefined) {
          fileRevisions[file] = [
            { timestamp: commit.timestamp, id: commit.hash },
          ];
        } else {
          fileRevisions[file].push({
            timestamp: commit.timestamp,
            id: commit.hash,
          });
        }
      }
    }
  }
  return fileRevisions;
}

function dataFileFor(filePath) {
  const parsed = parse(filePath);
  return `${join(parsed.dir, parsed.name)}.11tydata.json`;
}

async function updateFileRevisions(fileRevisions) {
  for (const filePath in fileRevisions) {
    const dataFile = dataFileFor(filePath);
    let dataFileContents;
    try {
      const unparsed = await readFile(dataFile, { encoding: 'utf8' });
      dataFileContents = JSON.parse(unparsed);
    } catch (err) {
      if (err instanceof Error && err.code === 'ENOENT') {
        // file doesn't exist, that's fine make a new one
        dataFileContents = {};
      } else {
        // otherwise something is wrong
        throw err;
      }
    }
    if (dataFileContents.revisions === undefined) {
      dataFileContents.revisions = [];
    }
    // inefficient, but the numbers are small-ish so ¯\_(ツ)_/¯
    for (const revisionInfo of fileRevisions[filePath]) {
      // if it's not in there, add it
      if (
        !dataFileContents.revisions.some(
          (r) => r.timestamp === revisionInfo.timestamp
        )
      ) {
        dataFileContents.revisions.push(revisionInfo);
      }
    }
    // update lastUpdated
    const timestamps = dataFileContents.revisions.map((r) => r.timestamp);
    const lastUpdated = Math.max(...timestamps);
    dataFileContents.lastUpdated = lastUpdated;

    await writeFile(dataFile, JSON.stringify(dataFileContents, null, 2), {
      encoding: 'utf8',
    });
  }
}

// go back 20 commits, that should be plenty
const commitInfos = await getPrevCommitInfo(20);
const fileRevisions = await getFileRevisions(commitInfos);

console.log('Updating file modification info...');
await updateFileRevisions(fileRevisions);

// this is what the json for this stuff will look like
// (ex: src/index.11tydata.json)
// {
//   ...
//   // I don't think it matters if this is sorted or not (at least for now)
//   revisions: [
//     {
//       timestamp: 1638389705,
//       id: b4f4a44463c982fec519d3864144b2914de045aa
//     },
//     ...
//   ],
//   // so I don't waste time re-calculating this every build
//   lastUpdated: 1638389705,
//   ...
// }
