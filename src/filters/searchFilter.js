// https://www.belter.io/eleventy-search/
const elasticlunr = require("elasticlunr");

module.exports = function (collection) {
  // what fields we'd like our index to consist of
  var index = elasticlunr(function () {
    this.setRef("id");
    this.addField("title");
  });

  // loop through each page and add it to the index
  collection.forEach((page) => {
    index.addDoc({
      id: page.url,
      title: page.template.frontMatter.data.title,
    });
  });

  return index.toJSON();
};
