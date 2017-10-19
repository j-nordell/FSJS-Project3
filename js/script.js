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
const activitySelect = document.getElementsByClassName("activities");
const activitiesSelections = document.querySelectorAll(".activities input");
let colorOptions = document.querySelectorAll("#color option");
let colorDict = {};
let activitiesCost = 0;


// ========================
// To initialize the page
// ========================


setFocusOnElement(document.getElementById('name'));
displayOtherField("none");
resetDefaultPayment();
stripExtraColorText();
createSelectColorOption();
colorOptions = document.querySelectorAll("#color option");
setupColorDict();
populateShirtLists();
listenToActivitySelection();
createCostText();
updateCostText();


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

    while(colorSelect.options.length) {
        colorSelect.remove(0);
    }

    let colors = colorDict[designSelection];

    if(colors) {
        for(let i = 0; i < colors.length; i++) {
            let color = new Option(colors[i], i);
            colorSelect.options.add(color);
        }
    }
}

function createCostText() {
    let totalCostParagraph = document.createElement("p");
    let totalCostText = document.createTextNode(`Total cost: $${activitiesCost}`);
    totalCostParagraph.appendChild(totalCostText);
    totalCostParagraph.setAttribute("id", "cost");
    activitySelect[0].appendChild(totalCostParagraph);
}

function updateCostText() {
    let costText = document.getElementById("cost");
    
    costText.innerHTML = `Total cost: $${activitiesCost}`;

    if(activitiesCost) {
        costText.style.display = "block";
    } else {
        costText.style.display = "none";
    }
}

function adjustCost(activityIndex) {

    let adjustment = 0;
    if(activityIndex) {
        adjustment = 100;
    } else {
        adjustment = 200;
    }

    if(activitiesSelections[activityIndex].checked) {
        activitiesCost += adjustment;
    } else {
        activitiesCost -= adjustment;
    }
}

// ========================
// Event Listeners
// ========================

// Job role
jobRoleSelect.addEventListener("change", function() {
    if(this.value == "other") {
        displayOtherField("block");
    } else {
        displayOtherField("none");
    }
});

// T-Shirt info
designSelect.addEventListener("change", function() {
    populateShirtLists();
});

// Activity Registration
function listenToActivitySelection() {

    for(let i = 0; i < activitiesSelections.length; i++) {
        activitiesSelections[i].addEventListener("click", function() {
            // console.log("I love Michael");
            adjustCost(i);
            updateCostText(i);
        });
    }
}

// Payment Info

