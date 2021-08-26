console.log("Started index.js");

var content = getUrlParameter("content");

console.log("Address var: " + content);

$(".homepageContent").hide();
displayContent();

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};



function displayContent() {
    var contentName = getUrlParameter("content");

    if(contentName == null) {
        contentName = "about";
    }

    console.log("Display " + contentName);

    $("#" + contentName + "Content").fadeIn();
}
