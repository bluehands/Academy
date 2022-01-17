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

    // Return your Object options:
    return {
        dir: {
            input: "./src",
            output: "./build"
        }
    }
};
