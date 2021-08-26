var data;

$("#projectList").hide();

readJSON();

function readJSON() {
    console.log("Reading JSON file.");
    $.ajax({
        url: "/projects/project_list.json",
        dataType: "json",
        success: function (parsed_json) {
            console.log("Found the JSON file.");
            console.log(parsed_json);
            data = parsed_json;
            generatePage();
        }
    });
}

function generatePage() {
    var html = "";

    for(var i = 0; i < data.projects.length; i++) {
        var currentProject = data.projects[i];

        if(currentProject.show) {
            html += `
            <div class="listItem">
                <div class="listTitleBox">
                    <p class="listTitle">
                        ${currentProject.name}
                    </p>
                </div>
                <div class="listDateBox">
                    <p class="listDate">
                        ${currentProject.date}
                    </p>
                </div>
                <div class="listLanguageBox">
                    <p class="listLanguage">
                        ${currentProject.language}
                    </p>
                </div>
                <div class="listDescriptionBox">
                    <p class="listDescription">
                        ${currentProject.description}
                    </p>
                </div>
                <div class="listProjectLinkBox">
                    <a href="${currentProject.projectURL}" class="listProjectLink">
                        <p class="listProjectLinkText">
                            Link to Project
                        </p>
                    </a>
                </div>
            </div>
            `;
        }
        $("#projectList").html(html);
        $("#projectList").fadeIn();
    }
}