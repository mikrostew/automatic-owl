---
title: JavaScript Linting and Formatting
description: Because I always forget how to set this up, and it changes with every major version bump
layout: base-page
extraCSS:
 - code-blocks

---

### Linting

eslint: <https://github.com/eslint/eslint>

==TODO: why do I like eslint?==

how to install eslint: <https://eslint.org/docs/latest/use/getting-started>


### Formatting / Code Style

prettier: <https://github.com/prettier/prettier>

==TODO: why prettier?==

how to install prettier: <https://prettier.io/docs/en/install.html>

playing nice with eslint: <https://prettier.io/docs/en/integrating-with-linters.html>

I should install this: <https://github.com/prettier/eslint-config-prettier>


### HowTo

Anyway, putting that all together, for my website as an example

Install eslint
(even tho I'm using yarn, this is the way to run this)

```bash
$ npm init @eslint/config
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser, node
✔ What format do you want your config file to be in? · JavaScript
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · yarn
Installing @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest, eslint@latest
➤ YN0000: ┌ Resolution step
➤ YN0000: └ Completed in 6s 734ms
➤ YN0000: ┌ Fetch step
➤ YN0013: │ eslint@npm:8.34.0 can't be found in the cache and will be fetched from the remote registry
➤ YN0000: └ Completed in 1s 309ms
➤ YN0000: ┌ Link step
➤ YN0000: └ Completed in 4s 846ms
➤ YN0000: Done in 13s 29ms
Successfully created .eslintrc.js file in /Users/mikrostew/src/gh/automatic-owl
```


Then install prettier

```bash
$ yarn add --dev --exact prettier
➤ YN0000: ┌ Resolution step
➤ YN0000: └ Completed in 0s 304ms
➤ YN0000: ┌ Fetch step
➤ YN0013: │ prettier@npm:2.8.4 can't be found in the cache and will be fetched from the remote registry
➤ YN0000: └ Completed in 3s 43ms
➤ YN0000: ┌ Link step
➤ YN0000: └ Completed in 0s 663ms
➤ YN0000: Done in 4s 165ms
```

```bash
$ echo {}> .prettierrc.json

$ cp .gitignore .prettierignore
```


Then configure them to play nicely together

```bash
$ yarn add --dev eslint-config-prettier
➤ YN0000: ┌ Resolution step
➤ YN0000: └ Completed in 0s 284ms
➤ YN0000: ┌ Fetch step
➤ YN0013: │ eslint-config-prettier@npm:8.6.0 can't be found in the cache and will be fetched from the remote registry
➤ YN0000: └ Completed in 0s 560ms
➤ YN0000: ┌ Link step
➤ YN0000: └ Completed in 0s 341ms
➤ YN0000: Done in 1s 293ms
```


And add prettier to the `.eslintrc.js` file so it looks like so

```javascript
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    }
}
```


Note: Not going to integrate these with git hooks, I don't like slowing down my git commit flow

<https://prettier.io/docs/en/install.html#git-hooks>


make sure this is setup with vim as well: <https://prettier.io/docs/en/editors.html>

I use ALE: <https://github.com/dense-analysis/ale>

so this should work I hope, in my `.vimrc`

```vimscript
let g:ale_fixers = {
\   'javascript': ['eslint', 'prettier'],
\   'typescript': ['eslint', 'prettier'],
\}
let g:ale_fix_on_save = 1
```


and that's it? ¯&bsol;\_(ツ)\_/¯

All of this was initially done in [this commit](https://github.com/mikrostew/automatic-owl/commit/183f56444167ff910656357402f46743ba6fede9).

Then I fixed some prettier config [here, to prefer single quotes](https://github.com/mikrostew/automatic-owl/commit/b5f2741be994129ac2bab4608f7297e41ab7269d).
