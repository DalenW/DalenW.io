//on page load clear the forms
fullReset();

var repairVal = "N";
var optionSelect = false;
var additionalInfo = false;

var SROSubmission = "";
var GSXSubmission = "";

var optionPhonesHTML = "<option>1. iPhone SE</option><option>2. iPhone 6s, 7, 8</option><option>3. iPhone 6s+, 7+, 8+</option><option>4. iPhone XR, 11</option><option>5. iPhone X, XS, 11 Pro</option><option>6. iPhone XS Max, 11 Pro Max</option>";
var optionBootHTML = "<option>1. Flashing Folder</option><option>2. Stuck Loading Bar</option><option>3. Cross-Out Symbol</option>"

$("#warrantyCheck").change(function () {
    if($("#warrantyCheck").is(":checked")) {
        $("#SROPriceInput").val("Apple Warranty");
    } else {
        $("#SROPriceInput").val("$");
    }

    if(repairVal == "N") {
        if($("#warrantyCheck").is(":checked")) {
            $("#GSXRecommendedInput").val("Device is eligible for In Warranty repair according to the VMI Guide. Recommend replacing the PART.");
        } else {
            $("#GSXRecommendedInput").val("Device is eligible for Out of Warranty repair according to the VMI Guide. Recommend replacing the PART.");
        }
    } else if(repairVal == "1") {
        if($("#warrantyCheck").is(":checked")) {
            $("#SROPriceInput").val("$31.10 with tax");
            SROSubmit();
        }
    } else if(repairVal == "2") {
        if($("#warrantyCheck").is(":checked")) {
            $("#GSXRecommendedInput").val("Device is eligible for In Warranty repair according to the VMI Guide. Recommend replacing the battery.");
        }
    }
    SROSubmit();
    GSXSubmit();
});

$("#commonSelect").change(function () {
    commonSelect = document.getElementById("commonSelect");
    repairVal = commonSelect.value

    if(repairVal == 0) { //reset everything
        reset(true);
        optionSelection(false);
        additionalInfoToggle(false);
    }

    //set repair option selection
    if(repairVal == 1 || repairVal == 2) {
        $("#optionSelect").html(optionPhonesHTML);
        $("#optionSelectTitle").html("Device: ");
        $("#optionSelect").val("2. iPhone 6s, 7, 8");
    } else if(repairVal == 5) {
        $("#optionSelect").html(optionBootHTML);
        $("#optionSelectTitle").html("Option: ");
        $("#optionSelect").val("1. Flashing Folder");
    }

    //iphone display replacement
    if(repairVal == 1) { 
        reset(false);
        optionSelection(true);
        additionalInfoToggle(true);

        $("#SROSymptomInput").val("Display is cracked and needs to be replaced.");
        $("#SROBackupInput").val("Yes");
        $("#SROTimeframeInput").val("EOD");
        $("#SROPriceInput").val("$187 + tax");
        $("#SROFirmwareInput").val("Off");

        $("#GSXIssueInput").val("Display is cracked and needs to be replaced.");
        $("#GSXStepsTakenInput").val("Verified the issue. Ran MRI and everything else passed. Device enclosure is fine and the display can be replaced.");
        $("#GSXCosmeticInput").val('Marks and dings, cracked display.');
        $("#GSXRecommendedInput").val("Device is eligible for Out of Warranty repair according to the VMI Guide. Recommend replacing the display.");

        $("#additionalInfo").html("<p><h3>6s Displays</h3><br><b>Space Gray</b><p>661-07285</p><b>Silver</b><p>661-07286</p><b>Gold</b><p>661-07287</p><b>Rose Gold</b><p>661-07288</p><br><h3>7 Displays</h3><br><b>Black, Jet Black</b><p>661-07293</p><b>Silver, Red</b><p>661-07294</p><b>Gold</b><p>661-07295</p><b>Rose Gold</b><p>661-07296</p><br><h3>8 Displays</h3><br><b>Space Gray</b><p>661-08933</p><b>Silver</b><p>661-08934</p><b>Gold</b><p>661-09081</p><b>Red</b><p>661-10102</p></p>");

        SROSubmit();
        GSXSubmit();

    }

    //iphone battery replacement
    if(repairVal == 2) { 
        reset(false);
        optionSelection(true);
        additionalInfoToggle(false);

        $("#SROSymptomInput").val("Battery fails diagnostics and needs to be replaced.");
        $("#SROBackupInput").val("Yes");
        $("#SROTimeframeInput").val("EOD");
        $("#SROPriceInput").val("$86.97 tax");
        $("#SROFirmwareInput").val("Off");

        $("#GSXIssueInput").val("Battery needs to be replaced.");
        $("#GSXStepsTakenInput").val("Verified the issue. Ran MRI and battery failed diagnositcs and needs to be replaced.");
        $("#GSXCosmeticInput").val('Marks and dings');
        $("#GSXRecommendedInput").val("Device is eligible for Out of Warranty repair according to the VMI Guide. Recommend replacing the battery.");

        SROSubmit();
        GSXSubmit();
    }

    //malware removal
    if(repairVal == 3) { 
        reset(false);
        optionSelection(false);
        additionalInfoToggle(false);

        $("#SROSymptomInput").val("Malware Removal");
        $("#SROBackupInput").val("Yes");
        $("#SROTimeframeInput").val("3 Business Days");
        $("#SROPriceInput").val("$107.24 with tax");
        $("#SROFirmwareInput").val("Off");

        SROSubmit();
    }

    //wipe & reinstall
    if(repairVal == 4) { 
        reset(false);
        optionSelection(false);
        additionalInfoToggle(false);

        $("#SROSymptomInput").val("Wipe and reinstall macOS.");
        $("#SROBackupInput").val("NA");
        $("#SROTimeframeInput").val("3 Business Days");
        $("#SROPriceInput").val("$99.99 + tax");
        $("#SROFirmwareInput").val("Off");

        SROSubmit();
    }

    //boot issues
    if(repairVal == 5) { 
        reset(false);
        optionSelection(true);
        additionalInfoToggle(false);

        $("#SROSymptomInput").val("Boots to a flashing folder.");
        $("#SROBackupInput").val("NA");
        $("#SROTimeframeInput").val("1 week");
        $("#SROPriceInput").val("$99.99 + tax");
        $("#SROFirmwareInput").val("Off");

        SROSubmit();
    }

    //iphone no service rep
    if(repairVal == 6) { 
        reset(true);
        optionSelection(false);
        additionalInfoToggle(false);

        $("#SROSymptomInput").val("iPhone 7 No Service REP");
        $("#SROBackupInput").val("Yes");
        $("#SROTimeframeInput").val("2 Weeks");
        $("#SROPriceInput").val("REP");
        $("#SROFirmwareInput").val("Off");

        $("#GSXIssueInput").val("iPhone 7 No Service REP");
        $("#GSXStepsTakenInput").val("Verified the issue. Ran MRI and Serial Number Reader.");
        $("#GSXCosmeticInput").val('Marks and dings');
        $("#GSXRecommendedInput").val("Device is eligible for In Warranty repair according to the VMI Guide. Recommend mailing in the device for service.");

        SROSubmit();
        GSXSubmit();
    }

    //iphone x display rep
    if(repairVal == 7) { 
        reset(true);
        optionSelection(false);
        additionalInfoToggle(true);

        $("#SROSymptomInput").val("iPhone X ghost touch display REP");
        $("#SROBackupInput").val("Yes");
        $("#SROTimeframeInput").val("EOD");
        $("#SROPriceInput").val("REP");
        $("#SROFirmwareInput").val("Off");

        $("#GSXIssueInput").val("iPhone X ghost touch display REP");
        $("#GSXStepsTakenInput").val("Verified the issue. Ran MRI, multi-touch diagnostics failed.");
        $("#GSXCosmeticInput").val('Marks and dings');
        $("#GSXRecommendedInput").val("Device is eligible for In Warranty repair according to the VMI Guide. Recommend replacing the display.");

        $("#additionalInfo").html("661-13114");

        SROSubmit();
        GSXSubmit();
    }

    //mac keyboard rep
    if(repairVal == 8) {
        reset(true);
        optionSelection(false);
        additionalInfoToggle(false);

        $("#SROSymptomInput").val("Keyboard REP. The keys having issues are PUTKEYSHERE");
        $("#SROBackupInput").val("Yes");
        $("#SROTimeframeInput").val("2 weeks");
        $("#SROPriceInput").val("REP");
        $("#SROFirmwareInput").val("Off");

        $("#GSXIssueInput").val("MacBook Keyboard REP");
        $("#GSXStepsTakenInput").val("Verified the issue. The keys having issues are ");
        $("#GSXCosmeticInput").val('Marks and dings');
        $("#GSXRecommendedInput").val("Device is eligible for In Warranty repair according to the VMI Guide. Recommend replacing the Top Case.");

        SROSubmit();
        GSXSubmit();
    }

    //mac battery rep
    if(repairVal == 9) { 
        reset(true);
        optionSelection(false);
        additionalInfoToggle(true);

        $("#SROSymptomInput").val("Battery REP. The battery needs to be replaced.");
        $("#SROBackupInput").val("Yes");
        $("#SROTimeframeInput").val("1 week");
        $("#SROPriceInput").val("REP");
        $("#SROFirmwareInput").val("Off");

        $("#GSXIssueInput").val("MacBook Pro Battery Recall");
        $("#GSXStepsTakenInput").val("Verified the issue. The device is under the recall and requires a battery replacement.");
        $("#GSXCosmeticInput").val('Marks and dings');
        $("#GSXRecommendedInput").val("Device is eligible for In Warranty repair according to the VMI Guide. Recommend replacing the Top Case.");

        $("#additionalInfo").html("661-02536<br>923-03454");

        SROSubmit();
        GSXSubmit();
    }

    //mac swollen battery
    if(repairVal == 10) { 
        reset(true);
        optionSelection(false);
        additionalInfoToggle(false);

        $("#SROSymptomInput").val("Swollen Battery. The battery needs to be replaced.");
        $("#SROBackupInput").val("Yes");
        $("#SROTimeframeInput").val("2 weeks");
        $("#SROPriceInput").val("REP");
        $("#SROFirmwareInput").val("Off");

        $("#GSXIssueInput").val("Swollen Battery");
        $("#GSXStepsTakenInput").val("Verified the issue. The device has a swollen battery and requires replacement.");
        $("#GSXCosmeticInput").val('Marks and dings');
        $("#GSXRecommendedInput").val("Device is eligible for In Warranty repair according to the VMI Guide. Recommend replacing the Top Case.");

        SROSubmit();
        GSXSubmit();
    }

    //mac swollen battery
    if(repairVal == 11) { 
        reset(true);
        optionSelection(false);
        additionalInfoToggle(false);

        $("#SROSymptomInput").val("Device does not power on.");
        $("#SROBackupInput").val("Yes");
        $("#SROTimeframeInput").val("2 weeks");
        $("#SROPriceInput").val("REP");
        $("#SROFirmwareInput").val("Off");

        $("#GSXIssueInput").val("Dead Unit / No Power");
        $("#GSXStepsTakenInput").val("Verified the issue. The device does not power on. Attempted SMC reset, issue persists.");
        $("#GSXCosmeticInput").val('Marks and dings');
        $("#GSXRecommendedInput").val("Device is eligible for In Warranty repair according to the VMI Guide. Recommend a mail in repair.");

        SROSubmit();
        GSXSubmit();
    }
});

$("#optionSelect").change(function () {
    var value = $("#optionSelect option:selected").val();
    value = value.slice(0, 1);
    value = parseInt(value, 10);
    console.log(value);


    //iphone display
    if(repairVal == "1") {

        switch (value) {
            case 1:
                $("#SROPriceInput").val("$167 + tax");
                additionalInfoToggle(false);
                break;
            case 2:
                $("#SROPriceInput").val("$187 + tax");
                $("#additionalInfo").html("<p><h3>6s Displays</h3><br><b>Space Gray</b><p>661-07285</p><b>Silver</b><p>661-07286</p><b>Gold</b><p>661-07287</p><b>Rose Gold</b><p>661-07288</p><br><h3>7 Displays</h3><br><b>Black, Jet Black</b><p>661-07293</p><b>Silver, Red</b><p>661-07294</p><b>Gold</b><p>661-07295</p><b>Rose Gold</b><p>661-07296</p><br><h3>8 Displays</h3><br><b>Space Gray</b><p>661-08933</p><b>Silver</b><p>661-08934</p><b>Gold</b><p>661-09081</p><b>Red</b><p>661-10102</p></p>");
                break;
            case 3:
                $("#SROPriceInput").val("$207 + tax");
                $("#additionalInfo").html("<p><h3>6s+ Displays</h3><br><b>Space Gray</b><p>661-07293</p><b>Silver</b><p>661-07294</p><b>Gold</b><p>661-07295</p><b>Rose Gold</b><p>661-07296</p><br><h3>7+ Displays</h3><br><b>Black, Jet Black</b><p>661-07297</p><b>Silver, Red</b><p>661-07298</p><b>Gold</b><p>661-07299</p><b>Rose Gold</b><p>661-07300</p>br><h3>8+ Displays</h3><br><b>Space Gray</b><p>661-09032</p><b>Silver</b><p>661-09033</p><b>Gold</b><p>661-09034</p><b>Red</b><p>661-10103</p></p>");
                break;
            case 4:
                $("#SROPriceInput").val("$237 + tax");
                $("#additionalInfo").html("<p><b>XR Display</b><p>661-13114</p><br><b>11 Display</b><p>661-14098</p></p>");
                break;
            case 5:
                $("#SROPriceInput").val("$317 + tax");
                $("#additionalInfo").html("<p><b>X Display</b><p>661-13114</p><br><b>XS Display</b><p>661-10608</p><br><b>11 Pro Display</b><p>661-14096</p></p>");
                break;
            case 6:
                $("#SROPriceInput").val("$367 + tax");
                $("#additionalInfo").html("<p><b>XS Max Display</b><p>661-11037</p><br><b>11 Pro Max Display</b><p>661-14099</p></p>");
                break;
            default:
                $("#SROPriceInput").val("$177 + tax");
                break;
        }
        
        //quick warranty check
        if($("#warrantyCheck").is(":checked")) {
            $("#SROPriceInput").val("$29.00 plus tax");
        }
    }

    //iphone battery
    if(repairVal == "2") {
        switch (value) {
            case 1:
            case 2:
            case 3:
                $("#SROPriceInput").val("$86.97 + tax");
                break;
            case 4:
            case 5:
            case 6:
                $("#SROPriceInput").val("$127 + tax");
                break;
        }
    }

    //boot issues
    if (repairVal == "5") {
        switch (value) {
            case 1:
                $("#SROSymptomInput").val("Boots to a flashing folder.");
                break;
            case 2:
                $("#SROSymptomInput").val("Loading bar is stuck during boot.");
                break;
            case 3:
                $("#SROSymptomInput").val("Boots to a cross-out symbol.");
                break;
        
            default:
                $("#SROSymptomInput").val("Boots to a flashing folder.");
                break;
        }
    }
    SROSubmit();
});

function reset(warranty) {
    clearGSX();
    clearSRO();

    if(warranty) {
        $('#warrantyCheck').prop('checked', true);
    } else {
        $('#warrantyCheck').prop('checked', false);
    }
}

function optionSelection(toggle) {
    if(optionSelect && !toggle) {
        $("#optionSelectDiv").fadeOut();
        optionSelect = false;
    }
    if(!optionSelect && toggle) {
        $("#optionSelectDiv").fadeIn();
        optionSelect = true;
    }
}

function additionalInfoToggle(toggle) {
    if(additionalInfo && !toggle) {
        $("#additionalInfoDiv").fadeOut();
        additionalInfo = false;
    }
    if(!additionalInfo && toggle) {
        $("#additionalInfoDiv").fadeIn();
        additionalInfo = true;
    }
}

function GSXSubmit() {
    var text = "Issue: ";
    text += $("#GSXIssueInput").val();
    text += "<br>";
    text += "Steps Taken: ";
    text += $("#GSXStepsTakenInput").val();
    text += "<br>";
    text += "Cosmetic Condition: ";
    text += $("#GSXCosmeticInput").val();
    text += "<br>";
    text += "Recommended Resolution: ";
    text += $("#GSXRecommendedInput").val();

    $("#GSXOutputText").html(text);
    GSXSubmission = text;

    $("#GSXOutputText").css('margin-top', '25px');
    console.log("Submitted GSX Form");
}

//submits GSX Form, then copies it to the clipboard
function GSXCopySubmission() {
    GSXSubmit();
    //clipboard.writeText(GSXSubmission);
    //console.log("Copied GSX Submission");
}

function SROSubmit() {
    var text = "Symptom: ";
    text += $("#SROSymptomInput").val();
    text += "<br>";
    text += "Backed up: ";
    text += $("#SROBackupInput").val();
    text += "<br>";
    text += "Timeframe: ";
    text += $("#SROTimeframeInput").val();
    text += "<br>";
    text += "Price: ";
    text += $("#SROPriceInput").val();
    text += "<br>";
    text += "Firmware: ";
    text += $("#SROFirmwareInput").val();
    text += "<br>";

    $("#SROOutputText").html(text);
    SROSubmission = text;

    $("#SROOutputText").css('margin-top', '25px');
    console.log("Submitted SRO Form");
}

//submits SRO Form, then copies to the clipboard
function SROCopySubmission() {
    SROSubmit();
    //clipboard.writeText(SROSubmission);
    //console.log("Copied SRO Submission");
    //clipboard.writeText("This text is plain.");
}

function clearGSX() {
    $("#GSXIssueInput").val('');
    $("#GSXStepsTakenInput").val("Verified the issue, ");
    $("#GSXCosmeticInput").val('Marks and dings');
    $("#GSXRecommendedInput").val("Device is eligible for In Warranty repair according to the VMI Guide. Recommend replacing the PART.");
    $("#GSXOutputText").html("");
    $("#GSXOutputText").css('margin-top', '0px');
    console.log("Cleared GSX Form");
}

function clearSRO() {
    $("#SROSymptomInput").val('');
    $("#SROBackupInput").val("Yes");
    $("#SROTimeframeInput").val("2 - 3 Business Days");
    $("#SROPriceInput").val("$");
    $("#SROFirmwareInput").val("Off");
    $("#SROOutputText").html("");
    $("#SROOutputText").css('margin-top', '0px');
    console.log("Cleared SRO Form");
}

function fullReset() {
    clearGSX();
    clearSRO();
    resetRepairTree();

    repairVal = "N";
    optionSelect = false;
    additionalInfo = false;
}

function resetRepairTree() {
    $("#commonSelect").val("None");
    $("#optionSelectDiv").hide();
    $('#warrantyCheck').prop('checked', true);
    $("#additionalInfoDiv").hide();
}

$("#forms").change(function () {
    $("#commonSelect").val("None");
    repairVal = "N";
    optionSelection(false);
});

$("#GSXCheckIn").change(function (){
    GSXSubmit();
});

$("#SROCheckIn").change(function (){
    SROSubmit();
});

//action for the buttons
$(document).ready(function() {
    $("#SROClearButton").click(function() {
        clearSRO();
    });

    $("#GSXClearButton").click(function() {
        clearGSX();
    });
    $("#resetButton").click(function() {
        fullReset();
    });
});