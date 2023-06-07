---
title: Extracting Files With Commit History From a Git Repo
description: My quest to extract some files from my dotfiles repo, while maintaining their commit history.
layout: base-page
extraCSS:
 - code-blocks

---

### Problem

I have a couple of scripts in my [dotfiles repo](https://github.com/mikrostew/dotfiles) that really should be in separate repositories.
I thought it would be neat if I could extract those files from the dotfiles repo, but maintain their commit history.
I could just copy the files to blank repos and be done with it, but that's no fun.

### Solution

So, there is a [question about this very topic](https://stackoverflow.com/q/7375528) on Stack Overflow, of course.
This is the code from the [top-rated answer](https://stackoverflow.com/a/37037151):

```bash
git filter-branch --index-filter '
        git read-tree --empty
        git reset $GIT_COMMIT -- $your $files $here
    ' \
    -- --all -- $your $files $here
```

Good news is that it's simple-ish - just one long command.
Bad news is that I don't understand any of it.
I've used `git filter-branch` _maybe_ twice before, and every time I have to re-learn how to use it.
So, this post is all about exploring what this does and how it works, so I don't have to re-learn this the next time I need it.

(Warning: there is a lot of RTFM here, and the git documentation is not always great.)

### WTF does git filter-branch even do?

From the [git filter-branch docs](https://git-scm.com/docs/git-filter-branch):

> Rewrite branches
>
> Lets you rewrite Git revision history by rewriting the branches mentioned in the &lt;rev-list options&gt;, applying custom filters on each revision. Those filters can modify each tree (e.g. removing a file or running a perl rewrite on all files) or information about each commit. Otherwise, all information (including original commit times or merge information) will be preserved.

Ok, so this is a way to rewrite version history using a filter.

### The filter

`--index-filter <command>`

> This is the filter for rewriting the index. It is similar to the tree filter but does not check out the tree, which makes it much faster.

And under the "Filters" section:

> The filters are applied in the order as listed below. The &lt;command&gt; argument is always evaluated in the shell context using the eval command...

The order doesn't matter for this, since there is only the one `--index-filter`, which is used to rewrite the index.
I know enough about git to know that the index is where files are staged before being committed to the repository.
So this only operates on that area, and because the index is not checked-out to disk this is faster.


### The commands run by --index-filter

`git read-tree --empty`

From [the git-read-tree docs](https://git-scm.com/docs/git-read-tree):

> Reads the tree information given by &lt;tree-ish&gt; into the index, but does not actually update any of the files it "caches".

And `--empty`:

> Instead of reading tree object(s) into the index, just empty it.

So, that reads an empty tree into the index, which clears out the index.

`git reset $GIT_COMMIT -- $your $files $here`

From [the git-reset docs](https://git-scm.com/docs/git-reset):

> Reset current HEAD to the specified state.
>
> This form resets the index entries for all &lt;paths&gt; to their state at &lt;tree-ish&gt;. (It does not affect the working tree or the current branch.)

And `$GIT_COMMIT` is described on the [git-filter-branch page](https://git-scm.com/docs/git-filter-branch):

> The &lt;command&gt; argument is always evaluated in the shell context using the eval command (with the notable exception of the commit filter, for technical reasons). Prior to that, the $GIT_COMMIT environment variable will be set to contain the id of the commit being rewritten.

This part is resetting the specified files to their state at the commit specified by `$GIT_COMMIT`.

### Ok, so what are these --index-filter commands doing?

All together, for each commit, they are:

1. Creating an empty index, and
2. Resetting any specified files to their state at that commit

So only the history for the files I specify will be preserved.
Sounds like that should work.

### Why are the same files repeated in the &lt;rev-list options&gt;?

`--all -- $your $files $here`

> Arguments for git rev-list. All positive refs included by these options are rewritten. You may also specify options such as --all, but you must use -- to separate them from the git filter-branch options.

Ok, so `git filter-branch` will only rewrite the commits that are specified by these options.

Let's take a look at [the git rev-list docs](https://git-scm.com/docs/git-rev-list):

> Commit Limiting
>
> Besides specifying a range of commits that should be listed using the special notations explained in the description, additional commit limiting may be applied.

`--all`

> Pretend as if all the refs in `refs/`, along with `HEAD`, are listed on the command line as &lt;commit&gt;.

Ok, so this operates on all the brances in the repo.

> History Simplification
>
> Sometimes you are only interested in parts of the history, for example the commits modifying a particular &lt;path&gt;. But there are two parts of History Simplification, one part is selecting the commits and the other is how to do it, as there are various strategies to simplify the history.
>
> The following options select the commits to be shown:
>
> &lt;paths&gt;
>
> Commits modifying the given &lt;paths&gt; are selected.

Ok, so the files are listed again as the `<paths>` to rev-list, which limits the commits to only those that modify those particular files.
Which makes sense, because if all the commits were included to the `--index-filter`, it would create a bunch of extra empty commits corresponding to the original commits when none of these files were modified.

### Does this actually work?

Now that I've gone through all of the parts of that command, it looks like it should work.

But, I'm not entirely sure. One of the comments to that Stack Overflow answer is:

> For me, this kept the commits that touched the file in question but they were all empty, and the file itself was added in its present state in the commit that first created the file (i.e. not in the state it actually was at the time).

At this point the only way to know for sure is to do it.
Here we go.

First, I'm cloning this repo to another location, and removing the `origin` config, so that in case I screw things up I'm not going to accidentally push those changes back to the original repository:

```bash
$ git clone git@github.com:mikrostew/dotfiles.git
$ cd dotfiles/
$ git remote rm origin
```

Now, running the actual command, to extract the `generate-scripts.sh` file:

```bash
$ git filter-branch --index-filter 'git read-tree --empty; git reset $GIT_COMMIT -- generate-scripts.sh' -- --all -- generate-scripts.sh
Rewrite 00eb6998ec49f41bd0af25b25ac679240532c57a (1/36) (0 seconds passed, remaining 0 predicted)    Unstaged changes after reset:
D    generate-scripts.sh
Rewrite 07e1d05bef0f575c6af2b5dc206501d2c762d68b (2/36) (0 seconds passed, remaining 0 predicted)    Unstaged changes after reset:
D    generate-scripts.sh

# (lots more output...)

Ref 'refs/heads/master' was rewritten
```

I used `gitk` to look at the commits, and that left me with the history I expected - 36 commits that touched that file.
So I guess it _does_ work after all, how about that.

### What if the file has been renamed?

The other file I wanted to extract had actually been renamed at some point in the past.

You can see that using the `--follow` option to `git log`:

```bash
$ git log --name-only --oneline --follow .bash_repo_status
84fe190 cleanup git status debug function
.bash_repo_status
70bd87c fix bugs with untracked files reporting
.bash_repo_status
...
9e57638 rename since I will be re-enabling svn status
.bash_repo_status
3aecece tweak colors, icons, and positioning
bash_git_status.sh
fbc97f2 clean up and reorder branch names in merge and rebase conflict status
bash_git_status.sh
...
29b90eb split this repo from my dotfiles - rename as a first step
bash_git_status.sh
07c9188 move repo_status() to its own repository
.bashrc
f9c90db stop using 'git status' for rebase and merge
.bashrc
...
```

It actually started out as part of `.bashrc`, then was split off to `bash_git_status.sh`, then renamed to `.bash_repo_status`.

I don't want to include `.bashrc` in this, since that will give me all the history for that file, most of which has nothing to do with `.bash_repo_status`. So I will only go back as far as when the code was initially split off from `.bashrc`, which is good enough.

Let's do this.

```bash
$ git clone git@github.com:mikrostew/dotfiles.git
$ cd dotfiles/
$ git remote rm origin
```

Ok so far, same as the other one. Now I have to specify all of the files names, twice:

```bash
$ git filter-branch --index-filter 'git read-tree --empty; git reset $GIT_COMMIT -- .bash_repo_status bash_git_status.sh' -- --all -- .bash_repo_status bash_git_status.sh
Rewrite 29b90ebfe58fb03ed221bdd6ef0ecbb75f1726d7 (1/70) (0 seconds passed, remaining 0 predicted)    Unstaged changes after reset:
D    bash_git_status.sh
Rewrite 4229589c0d436a94c0877a3048abca50132c090d (2/70) (0 seconds passed, remaining 0 predicted)    Unstaged changes after reset:
D    bash_git_status.sh

# (lots more output here…)

Rewrite 84fe19009ee2c0ee3ab47f59858f950166f2960d (67/70) (5 seconds passed, remaining 0 predicted)    Unstaged changes after reset:
D    .bash_repo_status

Ref 'refs/heads/master' was rewritten
```

Again, that left me with the history I expected: 70 commits that touched that file. I ran `gitk` and verified that it had the entire history including the rename. All good.

==TODO: making this run faster with tmpfs.==
