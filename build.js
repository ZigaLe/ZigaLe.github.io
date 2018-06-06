const fs = require('fs');
const mustache = require('mustache');
const commonmark = require('commonmark');

const metadata = []
fs.readdirSync("templates/blog").forEach(file => {
    const data = fs.readFileSync("templates/blog/" + file, 'utf-8');

    const match = data.match(/---([^]+)---/);
    const view = JSON.parse(match[1]);
    metadata.push(view);

    const md = data.substring(match[0].length);
    const reader = new commonmark.Parser();
    const writer = new commonmark.HtmlRenderer();
    const parsed = reader.parse(md);
    const html = writer.render(parsed);

    const template = fs.readFileSync("templates/blog.mustache", "utf-8");
    const header = fs.readFileSync("templates/header.mustache", "utf-8");
    const footer = fs.readFileSync("templates/footer.mustache", "utf-8");
    const output = mustache.render(template, view, {
        content: html,
        header: header,
        footer: footer
    });

   fs.writeFileSync("blog/" + file.replace(".md", ".html"), output); 
});
