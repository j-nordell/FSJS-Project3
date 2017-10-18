// Project 3 - Full Stack JavaScript Techdegree
// Form traversal and validation
// Jennifer Nordell


// ========================
// Global variables and constants
// ========================

const jobRoleSelect = document.getElementById("title");
const designSelect = document.getElementById("design");
const designOptions = document.querySelectorAll("#design option")
const colorSelect = document.getElementById("color");
let colorOptions = document.querySelectorAll("#color option");
let colorDict = {};


// ========================
// To initialize the page
// ========================


setFocusOnElement(document.getElementById('name'));
displayOtherField("none");
resetDefaultPayment();
stripExtraColorText();
createSelectColorOption();
colorOptions = document.querySelectorAll("#color option");
//console.log(colorOptions);
setupColorDict();
populateShirtLists();


// ========================
// Helper functions
// ========================

function setFocusOnElement(element) {
    element.focus();
}

function displayOtherField(setting) {
    let otherField = document.getElementById("other-role");
    otherField.style.display = setting;
}

function stripExtraColorText() {
    for(let i = 0; i < colorOptions.length; i++) {
       colorOptions[i].innerHTML = colorOptions[i].innerHTML.replace(/\s\((.){1,}\)/g, "");
    }
}

function createSelectColorOption() {
    selectPromptOption = new Option("Please select a T-shirt theme");
    colorSelect.insertBefore(selectPromptOption, colorOptions[6]);
}

function resetDefaultPayment() {
    document.getElementById("credit-card").style.display = "none";
    document.getElementById("paypal").style.display = "none";
    document.getElementById("bitcoin").style.display = "none";
}

function setupColorDict() {
    colorDict[designOptions[0].innerHTML] = [colorOptions[6].innerHTML];
    colorDict[designOptions[1].innerHTML] = [colorOptions[0].innerHTML, colorOptions[1].innerHTML, colorOptions[2].innerHTML];
    colorDict[designOptions[2].innerHTML] = [colorOptions[3].innerHTML, colorOptions[4].innerHTML, colorOptions[5].innerHTML];
    for(var key in colorDict) {
        console.log(`Key: ${key}  Value: ${colorDict[key]}`);
    }
}

function populateShirtLists() {
    let designSelection = designSelect.options[designSelect.selectedIndex].innerHTML;
    //console.log(designSelection);

    // console.log(colorSelect.options);
    while(colorSelect.options.length) {
        colorSelect.remove(0);
    }

    let colors = colorDict[designSelection];
    console.log(colors);
    if(colors) {
        for(let i = 0; i < colors.length; i++) {
            let color = new Option(colors[i], i);
            colorSelect.options.add(color);
        }
    }
}

// ========================
// Event Listeners
// ========================

jobRoleSelect.addEventListener("change", function() {
    if(this.value == "other") {
        displayOtherField("block");
    } else {
        displayOtherField("none");
    }
});

designSelect.addEventListener("change", function() {
    populateShirtLists();
});
