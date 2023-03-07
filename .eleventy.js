const markdownIt = require('markdown-it');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItMark = require('markdown-it-mark');
const markdownItMathjax3 = require('markdown-it-mathjax3');

function hasUpdates(item) {
  return item.data?.lastUpdated !== undefined;
}

function updatedThings(collectionApi) {
  const recentlyUpdated = collectionApi.getAll().filter(hasUpdates);
  // sort descending
  recentlyUpdated.sort((a, b) => b.data.lastUpdated - a.data.lastUpdated);
  return recentlyUpdated;
}

// filters

// TODO: this is not quite right, because timezones, but close enough for now
function timestampToDateStr(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// see https://www.11ty.dev/docs/config/
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/automaticowl.pub');
  // folders to copy
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('fonts');
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('js');

  // collections to display on the home page
  eleventyConfig.addCollection('updated', updatedThings);

  // custom filters for templates
  eleventyConfig.addFilter('timestampToDateStr', timestampToDateStr);

  let options = {
    // enable HTML tags in source
    html: true,

    // auto-convert URL-like text to link
    linkify: true,

    // enables some nice replacements, and smart quotes
    // (see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js)
    // (c) (C) → ©
    // (tm) (TM) → ™
    // (r) (R) → ®
    // +- → ±
    // (p) (P) -> §
    // ... → … (also ?.... → ?.., !.... → !..)
    // ???????? → ???, !!!!! → !!!, `,,` → `,`
    // -- → &ndash;, --- → &mdash;
    typographer: true,
  };

  // markdown config
  const md = markdownIt(options)
    .use(markdownItMark)
    .use(markdownItFootnote)
    .use(markdownItMathjax3);
  eleventyConfig.setLibrary('md', md);

  // add a "Notes" header to the footnotes
  // (adapted from https://github.com/markdown-it/markdown-it-footnote#customize)
  md.renderer.rules.footnote_block_open = () =>
    '<hr class="footnotes-sep">\n' +
    '<h4>Notes</h4>\n' +
    '<section class="footnotes">\n' +
    '<ol class="footnotes-list">\n';

  // other config that doesn't use the API
  return {
    dir: {
      // this builds src/ --> _site/
      input: 'src',
      output: '_site',
      // these 3 are relative to dir.input
      includes: '_includes',
      layouts: '_layouts',
      data: '_data',
    },
    // set default template engines
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
