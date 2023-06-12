const markdownIt = require('markdown-it');
const markdownItContainter = require('markdown-it-container');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItMark = require('markdown-it-mark');
const markdownItMathjax3 = require('markdown-it-mathjax3');
const pluginLinkto = require('eleventy-plugin-link_to');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

function hasUpdates(item) {
  return item.data?.lastUpdated !== undefined;
}

function updatedThings(collectionApi) {
  const recentlyUpdated = collectionApi.getAll().filter(hasUpdates);
  // sort descending
  recentlyUpdated.sort((a, b) => b.data.lastUpdated - a.data.lastUpdated);
  return recentlyUpdated;
}

// markdown options & config
let mdOptions = {
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

const md = markdownIt(mdOptions)
  .use(markdownItContainter, 'note')
  .use(markdownItMark)
  .use(markdownItFootnote)
  .use(markdownItMathjax3);

// add a "Notes" header to the footnotes
// (adapted from https://github.com/markdown-it/markdown-it-footnote#customize)
md.renderer.rules.footnote_block_open = () =>
  '<hr class="footnotes-sep">\n' +
  '<h4>Notes</h4>\n' +
  '<section class="footnotes">\n' +
  '<ol class="footnotes-list">\n';

// filters

// TODO: this is not quite right, because timezones, but close enough for now
function timestampToDateStr(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// array of weeks for a given year and month
function calendarForMonth(year, month) {
  const monthIndex = month - 1;
  const dayInMonth = new Date(year, monthIndex, 1);
  // the spaces this needs at the start == the index of the day of the week
  const numStartSpaces = dayInMonth.getDay();
  const data = Array(numStartSpaces).fill('');
  // fill in the days of the month
  while (dayInMonth.getMonth() === monthIndex) {
    data.push(dayInMonth.getDate());
    dayInMonth.setDate(dayInMonth.getDate() + 1);
  }
  // pad the end to make this a multiple of 7
  while (data.length % 7 !== 0) {
    data.push('');
  }
  // split up into weeks
  const weekData = [];
  for (let i = 0; i < data.length; i += 7) {
    weekData.push(data.slice(i, i + 7));
  }

  return weekData;
}

// array of miles and relative percentage for weeks in the year
function milesByWeek(year, activities) {
  // figure out the max mileage, for scaling everything else
  const distances = Object.keys(activities).map((date) =>
    Number(activities[date].distance.replace(' mi', ''))
  );
  const maxDistance = distances.reduce((a, b) => Math.max(a, b), -Infinity);

  const weeks = [];
  let weeklyMiles = 0;

  // figure out by week, starting from Jan first
  const date = new Date(year, 0, 1);

  while (true) {
    if (date.getFullYear() !== year) {
      break;
    }
    const dateFmt = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    const activityData = activities[dateFmt];

    if (activityData !== undefined) {
      weeklyMiles += Number(activityData.distance.replace(' mi', ''));
    }

    date.setDate(date.getDate() + 1);
    if (date.getDay() === 0) {
      weeks.push({
        miles: weeklyMiles,
        percentage: ((100 * weeklyMiles) / maxDistance).toFixed(2),
      });
      weeklyMiles = 0;
    }
  }

  // anything leftover?
  if (date.getDay() !== 0) {
    weeks.push({
      miles: weeklyMiles,
      percentage: ((100 * weeklyMiles) / maxDistance).toFixed(2),
    });
  }

  return weeks;
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

  // additional plugins
  eleventyConfig.addPlugin(pluginLinkto);
  eleventyConfig.addPlugin(syntaxHighlight);

  // collections to display on the home page
  eleventyConfig.addCollection('updated', updatedThings);

  // custom filters for templates
  eleventyConfig.addFilter('timestampToDateStr', timestampToDateStr);
  eleventyConfig.addFilter('calendarForMonth', calendarForMonth);
  eleventyConfig.addFilter('milesByWeek', milesByWeek);

  // custom shortcodes
  // (nothing yet)

  eleventyConfig.setLibrary('md', md);

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
