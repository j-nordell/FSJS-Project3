// Project 3 - Full Stack JavaScript Techdegree
// Form traversal and validation
// Jennifer Nordell


// ========================
// Global variables and constants
// ========================

const jobRoleSelect = document.getElementById("title");
const tshirtSelect = document.getElementById("design");
const tshirtColors = document.querySelectorAll("#color option");


// ========================
// To initialize the page
// ========================

setFocusOnElement(document.getElementById('name'));
displayOtherField("none");
stripExtraColorText();


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
    for(let i = 0; i < tshirtColors.length; i++) {
       // console.log(tshirtColors);
       tshirtColors[i].innerHTML = tshirtColors[i].innerHTML.replace(/\((.){1,}\)/g, "");
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

