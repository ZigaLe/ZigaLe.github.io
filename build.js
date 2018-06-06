const fs = require('fs');
const mustache = require('mustache');
const commonmark = require('commonmark');

const metadata = []
const header = fs.readFileSync("templates/header.mustache", "utf-8");
const footer = fs.readFileSync("templates/footer.mustache", "utf-8");

fs.readdirSync("templates/blog").forEach(file => {
    const data = fs.readFileSync("templates/blog/" + file, 'utf-8');
    html_filename = file.replace(".md", ".html");

    const match = data.match(/---([^]+)---/);
    const view = JSON.parse(match[1]);
    view.url = "/blog/" + html_filename;
    metadata.push(view);

    const md = data.substring(match[0].length);
    const reader = new commonmark.Parser();
    const writer = new commonmark.HtmlRenderer();
    const parsed = reader.parse(md);
    const html = writer.render(parsed);

    const template = fs.readFileSync("templates/blog.mustache", "utf-8");
    const output = mustache.render(template, view, {
        content: html,
        header: header,
        footer: footer
    });

   fs.writeFileSync("blog/" + file.replace(".md", ".html"), output); 
});

const template = fs.readFileSync("templates/index.mustache", "utf-8");
const output = mustache.render(template, metadata, {
    header: header,
    footer: footer
});
fs.writeFileSync("index.html", output); 
