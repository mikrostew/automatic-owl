// see https://www.11ty.dev/docs/config/
module.exports = function (eleventyConfig) {
  // make sure favicon is copied over
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  // copy `img/` to `_site/img/`
  eleventyConfig.addPassthroughCopy('img');
  // make sure GPG key is copied over
  eleventyConfig.addPassthroughCopy('src/automaticowl.pub');

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
