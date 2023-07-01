---
title: Deprecated OSS Repos
description: How I deprecate unmaintained OSS code, and which repos I've deprecated
layout: base-page

---

### Why deprecate repos?

A few reasons:
* I don't have the time or energy to maintain every bit of code I've ever written, especially things are no longer used by me or anyone else.
* I also sometimes[^sometimes] start projects, and then never get very far with them.
* Sometimes I want to move things around.
* I don't need a reason! I just feel like it! You're not my real dad!

[^sometimes]: often, actually


### How I mark repositories as deprecated

Close any open Issues and PRs.

In the "About" section (click the gear)
* add "⛔️ [DEPRECATED]" to the repo description
* add a "deprecated" topic

Remove any CI config
* travis.yml
* .github/workflows/*

Add "⛔️ [DEPRECATED]" to the README, and an explanation of why.

Archive the repository
* Settings > Archive this repository (then there are a few dialogs)

### Repos I have deprecated

[oauth-utils](https://github.com/mikrostew/oauth-utils): I [copied these to my scripts repo](https://github.com/mikrostew/scripts/commit/350aac595575272dad9c597e9ac99f4cacc21606), and maintain them there

[htmlbars-comment-redactor](https://github.com/mikrostew/htmlbars-comment-redactor): I don't remember why I wrote this. I think I was testing something, but that was years ago.

[dependent-task-runner](https://github.com/mikrostew/dependent-task-runner): Something I started hacking at to implement a graph algorithm. I may revisit this again.

[laminar](https://github.com/mikrostew/laminar): Never did anything with this, but I thought the name was clever.

[cheat-sheets](https://github.com/mikrostew/cheat-sheets): Don't use or update these anymore.
