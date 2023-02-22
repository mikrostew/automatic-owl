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

function setLastUpdated(item) {
  const date = new Date(item.lastUpdatedTimestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  item.lastUpdated = `${year}-${month}-${day}`;
  return item;
}

function updatedThings(collectionApi) {
  const recentlyUpdated = collectionApi
    .getAll()
    .filter(hasUpdates)
    .map(setLastUpdatedTimestamp)
    .map(setLastUpdated);
  recentlyUpdated.sort(
    (a, b) => b.lastUpdatedTimestamp - a.lastUpdatedTimestamp
  );
  return recentlyUpdated;
}

// see https://www.11ty.dev/docs/config/
module.exports = function (eleventyConfig) {
  // make sure favicon is copied over
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  // copy `img/` to `_site/img/`
  eleventyConfig.addPassthroughCopy('img');
  // make sure GPG key is copied over
  eleventyConfig.addPassthroughCopy('src/automaticowl.pub');

  // collections to display on the home page
  eleventyConfig.addCollection('updated', updatedThings);

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
      // set default template engines
      dataTemplateEngine: 'njk',
      markdownTemplateEngine: 'njk',
      htmlTemplateEngine: 'njk',
    },
  };
};
