"use strict"

function show_blog() {

}


const selected_projects = [
    "MyoLinux",
    "dirtool"
];

const projects = document.getElementById('projects');
projects.onclick = () => {

    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {

        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {

            let items = [];
            const response = JSON.parse(request.responseText);

            for (let item of response) {
                const name = item.name;
                if (!selected_projects.includes(name)) {
                    continue;
                }

                // Format date
                item.pushed_at = item.pushed_at.replace("T", ' ').slice(0, -1);

                items[selected_projects.indexOf(name)] = item;
            }
            
            const content = document.getElementById("content");
            const template = document.getElementById("project-github-template").innerHTML;
            content.innerHTML = Mustache.render(template, items);
        }
    }
    request.open("GET", "https://api.github.com/users/brokenpylons/repos", true);
    request.send();
}

function show_about() {

}
