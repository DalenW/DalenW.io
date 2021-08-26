var data;

$("#guidePage").hide();

readData();

function readData() {
    console.log("Reading JSON file.");
    $.ajax({
        url: "guides.json",
        dataType: "json",
        success: function (parsed_json) {
            console.log("Found the JSON file.");
            console.log(parsed_json);
            data = parsed_json;
            createGuideList();
        }
    });
}

function createGuideList() {
    var html = "";

    for (var i = 0; i < data.guides.length; i++) 
        if(data.guides[i].show == true) {
            html += "<a href=\"javascript:loadGuide(" + i + ")\">";
            html += "<div class=\"guideListBox\">";
            html += "<img src=\"images/" + data.guides[i].folder + "/" + data.guides[i].image + ".png\" alt=\"" + data.guides[i].image + " Icon\" class=\"guideListBoxImage\">";
            html += "<div class=\"guideListBoxTitleBox\">";
            html += "<p class=\"guideListBoxTitle\">" + data.guides[i].name;
            html += "</p></div></div></a>";
        }
        
    $("#guideList").html(html);
}

function loadGuide(guideNum) {
    console.log("Loading guide " + guideNum);
    var guide = data.guides[guideNum];

    $("#guideTitle").html(guide.name);

    var guideHTML = "";

    //parse guide
    var lastLine = "";
    var listNum = 1;
    for (var i = 0; i < guide.guide.length; i++) {
        var line = guide.guide[i];

        //first replace all \n with <br>
        for(var x = 0; x < line.length; x++)
            if(line.substring(x, x + 1) == "\n") 
                line = line.substring(0, x) + "<br>" + line.substring(x + 1);

        //then insert tabs
        for(var x = 0; x < line.length; x++)
            if(line.substring(x, x + 1) == "\t")
                line = line.substring(0, x) + "&emsp;" + line.substring(x + 1);

        //then get the quotes line
        var endQuote = false;
        for(var x = 0; x < line.length; x++)
            if(line.substring(x, x + 1) == "`") {
                if(endQuote)
                    line = line.substring(0, x) + "</quote>" + line.substring(x + 1);
                else
                    line = line.substring(0, x) + "<quote>" + line.substring(x + 1);
                endQuote = !endQuote;
            }

        //then parse the guide command
        if (line.substring(0, 1) == "/") {
            var type = line.substring(1, 2);
            var content = line.substring(3);

            //if its code
            var num = 1;
            if (type == "c") {
                guideHTML += "<div class=\"code\">";
                
                for(var x = 0; x < content.length; x++) {
                    if(content.substring(x, x + 4) == "<br>") {
                        var cut = content.substring(0, x + 4);
                        content = content.substring(x + 4, content.length);
                        //guideHTML += num + ".  " + cut;
                        guideHTML += cut;
                        num++;  
                        x = 0;
                    }
                }
                //guideHTML += num + ".  " + content;
                guideHTML += content;

                guideHTML += "</div>";
            }

            //if its an image
            if (type == "i")
                guideHTML += "<div class=\"guideImageDiv\"><img src=\"images/" + guide.folder + "/" + content + "\" class=\"guideImage\"></div>";

            //if its a video
            if(type == "v")
                guideHTML += "<div class=\"guideVideoDiv\"><video height=\"100%\" width=\"100%\" controls><source src=\"videos/" + guide.folder + "/" + content + "\" type=\"video/" + content.substring(content.length - 3) + "\" class=\"guideVideo\">Your browser does not support this video. </video></div>";

            //if its a section header
            if (type == "s")
                guideHTML += "<h6>" + content + "</h6>";

            //if its an ordered list 
            //beginning of the list
            if(type == "o" && lastLine.substring(0, 2) != "/o") 
                listNum = 1;
            
            //other list item
            if(type == "o"){
                guideHTML += "<p>" + listNum + ". " + content + "</p>";
                listNum++;
            }
            

        } else {
            guideHTML += "<p>" + line + "</p>";
        }

        //make sure that images don't fall under last line
        if(line.substring(0, 2) != "/i")
            lastLine = line;
    }

    $("#guide").html(guideHTML);

    $("#homePage").fadeOut(250);
    $("#guidePage").fadeIn(250);
}

function showGuideList() {
    $("#guidePage").fadeOut(250);
    $("#homePage").fadeIn(250);
}