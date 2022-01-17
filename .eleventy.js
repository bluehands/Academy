const yaml = require("js-yaml");
const md = require("markdown-it")();

module.exports = function(eleventyConfig) {
    // Yaml
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

    // Return your Object options:
    return {
        dir: {
            input: "./src",
        }
    };
};
