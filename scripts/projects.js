"use strict"

const selected_projects = [
    "MyoLinux",
    "dirtool"
];

window.onload = () => {

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
            const template = `
                {{#.}}
                <div class="entry">
                    <a href="{{html_url}}"><h2>{{name}}</h2></a>
                    <div class="tags">
                        {{pushed_at}}&emsp;
                        {{license.key}}&emsp;
                        <a href="{{html_url}}/stargazers"><ion-icon name="star"></ion-icon> {{stargazers_count}}</a>&emsp;
                        <a href="{{html_url}}/network"><ion-icon name="git-network"></ion-icon> {{forks_count}}</a>
                    </div>
                    <p>{{description}}</p>
                </div>
                {{/.}}`;
            content.innerHTML = Mustache.render(template, items);
        }
    }
    request.open("GET", "https://api.github.com/users/brokenpylons/repos", true);
    request.send();
}
