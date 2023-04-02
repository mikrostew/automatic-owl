#!/usr/bin/env bash

# If there are any modified or untracked files, exit non-zero

if output="$(git status --porcelain)" && [ -z "$output" ]
then
  echo "Working directory is clean!"
else
  echo "Working directory is dirty!"
  echo "$output"
  exit 1
fi
