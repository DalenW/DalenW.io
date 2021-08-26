var sro = "null";
var sentTracking = "null";
var returnTracking = "null";
var kgb = "null";
var RQCheck = true;
var sentShipper = "Shipper";
var returnShipper = "Shipper";

var UPSLength = 18;
var FedExLength = 34;
var KGBLength = 17;

//on page load clear form
clear();

$("#SROInput").change(function () {
    var value = $("#SROInput").val();
    if (value.length == "UT101082385".length) {
        $("#SROLabel").css("color", "var(--main-green)");
        sro = value;
    } else {
        $("#SROLabel").css("color", "var(--main-red)");
        sro = "null";
    }
    $("#sentTrackingInput").val('');
    $("#returnTrackingInput").val('');
    updateText();
});

$("#sentTrackingInput").change(function () {
    var value = $("#sentTrackingInput").val();
    if (value.length == UPSLength || value.length == FedExLength) {
        var shipType = value.slice(0, 2);
        if (value.length == UPSLength && shipType == "1Z") {
            $("#sentTrackingLabel").css("color", "var(--main-green)");
            sentTracking = value;
            sentShipper = "UPS";
        } else if (value.length == FedExLength && (shipType == "10" || shipType == "96")) {
            var bar = value.slice(22, 26) + " " + value.slice(26, 30) + " " + value.slice(30);
            $("#sentTrackingLabel").css("color", "var(--main-green)");
            sentTracking = bar;
            sentShipper = "FedEx";
        } else {
            $("#returnTrackingLabel").css("color", "var(--main-red)");
            sentTracking = "null";
        }
    } else if ($("#sentTrackingInput").val() == "") {
        $("#sentTrackingLabel").css("color", "var(--slategray)");
        sentTracking = "null";
    } else {
        $("#sentTrackingLabel").css("color", "var(--main-red)");
        sentTracking = "null";
    }
    updateText();
});

$("#returnTrackingInput").change(function () {
    var value = $("#returnTrackingInput").val();
    if (value.length == UPSLength || value.length == FedExLength) {
        var shipType = value.slice(0, 2);
        if (value.length == UPSLength && shipType == "1Z") {
            $("#returnTrackingLabel").css("color", "var(--main-green)");
            returnTracking = value;
            returnShipper = "UPS";
        } else if (value.length == FedExLength && (shipType == "10" || shipType == "96")) {
            var bar = value.slice(22, 26) + " " + value.slice(26, 30) + " " + value.slice(30);
            $("#returnTrackingLabel").css("color", "var(--main-green)");
            returnTracking = bar;
            returnShipper = "FedEx";
        } else {
            $("#returnTrackingLabel").css("color", "var(--main-red)");
            returnTracking = "null";
        }
    } else if ($("#returnTrackingInput").val() == "") {
        $("#returnTrackingLabel").css("color", "var(--slategray)");
        returnTracking = "null";
    } else {
        $("#returnTrackingLabel").css("color", "var(--main-red)");
        returnTracking = "null";
    }
    updateText();
});

$("#KGBInput").change(function () {
    var value = $("#KGBInput").val();
    kgb = value;
    
    if (value.length == KGBLength) {
        $("#KGBLabel").css("color", "var(--main-green)");
    } else {
        $("#KGBLabel").css("color", "var(--main-red)");
    }

    updateText();
});

$("#RQCheck").change(function () {
    if ($("#RQCheck").is(":checked")) {
        RQCheck = true;
    } else {
        RQCheck = false;
    }
    updateText();
});

function updateText() {
    if (RQCheck) {
        var text = "Recieved item from Apple in RQ. <br><br>";

        text += "GSX PO: " + sro +  "<br>";

        text += "KGB: " + kgb +  "<br>";

        text += sentShipper + " Sent Tracking: " + sentTracking + "<br>";

        if (returnTracking != "null") {
            text += returnShipper + " Return Tracking: " + returnTracking;
        }

        

        $("#outputText").html(text);
    } else {
        var text = "Subject: Need PO for " + sro + "<br><br>";

        text += "Hi,<br><br>I need a PO for " + sro + ".";
        text += "<br><br>Thanks,<br>Dalen";
        $("#outputText").html(text);
    }
}

function clear() {
    $("#SROInput").val('');
    $("#sentTrackingInput").val('');
    $("#returnTrackingInput").val('');
    $("#KGBInput").val('');

    console.log("Cleared");
}