const markdownIt = require('markdown-it');
const markdownItMark = require('markdown-it-mark');

// TODO: this is not quite right, because timezones, but close enough for now
function unixTimestampToDateStr(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function hasUpdates(item) {
  return item.data?.revisions?.length > 0;
}

function setLastUpdatedTimestamp(item) {
  const timestamps = item.data.revisions.map((r) => r.timestamp);
  // sort descending
  timestamps.sort((a, b) => b - a);
  item.lastUpdatedTimestamp = timestamps[0];
  return item;
}

function updatedThings(collectionApi) {
  const recentlyUpdated = collectionApi
    .getAll()
    .filter(hasUpdates)
    .map(setLastUpdatedTimestamp);
  recentlyUpdated.sort(
    (a, b) => b.lastUpdatedTimestamp - a.lastUpdatedTimestamp
  );
  return recentlyUpdated;
}

// filters

function toLastUpdated(revisions) {
  if (!Array.isArray(revisions)) {
    return '';
  }
  const timestamps = revisions.map((r) => r.timestamp);
  // sort descending
  timestamps.sort((a, b) => b - a);
  return unixTimestampToDateStr(timestamps[0]);
}

// see https://www.11ty.dev/docs/config/
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/automaticowl.pub');
  // folders to copy
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('fonts');

  // collections to display on the home page
  eleventyConfig.addCollection('updated', updatedThings);

  // custom filters for templates
  eleventyConfig.addFilter('toLastUpdated', toLastUpdated);

  // markdown config
  eleventyConfig.setLibrary(
    'md',
    markdownIt({ html: true }).use(markdownItMark)
  );

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
