// Project 3 - Full Stack JavaScript Techdegree
// Form traversal and validation
// Jennifer Nordell

// To initialize the page
setFocusOnElement(document.getElementById('name'));
createOtherField();
displayOtherField("none");

// Global variables and constants
const jobRoleSelect = document.getElementById("title");
const tshirtSelect = document.getElementById("design");
const tshirtColors = document.getElementById("colors-js-puns");

// Helper functions

function setFocusOnElement(element) {
    element.focus();
}

function createOtherField() {
    let otherFieldParent = document.getElementsByTagName('fieldset')[0];
    let inputField =document.createElement("input");
    inputField.id = "other-title";
    inputField.placeholder = "Your Job Role";
    otherFieldParent.appendChild(inputField);
}

function displayOtherField(setting) {
    let otherField = document.getElementById("other-title");
    otherField.style.display = setting;
}


//Event Listeners

jobRoleSelect.addEventListener("change", function() {
    if(this.value == "other") {
        displayOtherField("block");
    } else {
        displayOtherField("none");
    }
});

tshirtSelect.addEventListener("change", function() {
    console.log(this.value);
});