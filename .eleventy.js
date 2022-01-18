const yaml = require("js-yaml");
const md = require("markdown-it")();
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

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

    // Return your Object options:
    return {
        dir: {
            input: "./src",
        }
    };
};
