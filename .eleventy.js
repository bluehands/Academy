const yaml = require("js-yaml");
const md = require("markdown-it")();
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
// const pluginCSS = require("eleventy-postcss-extension");
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    // Extensions
    eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

    // Shortcodes
    eleventyConfig.addPairedShortcode("markdown", (content, inline = null) => {
        return inline
            ? md.renderInline(content)
            : md.render(content);
    });

    // Add watch targets
    eleventyConfig.addWatchTarget('./tailwind.config.js');
    eleventyConfig.addWatchTarget('./src/styles/*.css');

    // Plugins
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(inclusiveLangPlugin);
    // eleventyConfig.addPlugin(pluginCSS);

    // Filters
    eleventyConfig.addFilter('fullName', value => `${value.name} ${value.surname}`);
    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {
          zone: 'Europe/Berlin'
        }).toFormat("dd/MM/yyyy HH:mm");
    });

    // Passthrough copies
    eleventyConfig.addPassthroughCopy("./src/**/*.png");

    // Return your Object options:
    return {
        dir: {
            input: "./src",
        }
    };
};
