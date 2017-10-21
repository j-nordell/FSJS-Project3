"use strict";
// Project 3 - Full Stack JavaScript Techdegree
// Form traversal and validation
// Jennifer Nordell
/* jshint browser: true */


// ========================
// Global variables and constants
// ========================

const jobRoleSelect = document.getElementById("title");
const designSelect = document.getElementById("design");
const designOptions = designSelect.getElementsByTagName("option");
const colorSelect = document.getElementById("color");
const activitySelect = document.getElementsByClassName("activities");
const activitiesSelections = activitySelect[0].getElementsByTagName("input");
const paymentSelect = document.getElementById("payment");
const colorDict = {};

let activitiesCost = 0;


// ========================
// To initialize the page
// ========================


setFocusOnElement(document.getElementById('name'));
displayOtherField("none");
resetDefaultPayment();
stripExtraColorText();
createSelectColorOption();
setupColorDict();
populateShirtLists();
listenToActivitySelection();
createCostText();
updateCostText();
createWarnings();
selectCreditCard();


// ========================
// Helper functions
// ========================

function setFocusOnElement(element) {
    element.focus();
}

function displayOtherField(setting) {
    document.getElementById("other-role").style.display = setting;
}


function getColorOptions() {
    return document.getElementById("color").getElementsByTagName("option");
}


function stripExtraColorText() {
    let colorOptions = getColorOptions();

    for(let option of colorOptions) {
        option.innerHTML = option.innerHTML.replace(/\s\((.){1,}\)/g, "");
    }
}

function createSelectColorOption() {
    const selectPromptOption = new Option("Please select a T-shirt theme");
    colorSelect.insertBefore(selectPromptOption, getColorOptions()[6]);
}

function resetDefaultPayment() {
    const paymentTypes = ["credit-card", "paypal", "bitcoin"];

    for(let type of paymentTypes) {
        document.getElementById(type).style.display = "none";
    }
}

function setupColorDict() {
    let colorOptions = getColorOptions();
    colorDict[designOptions[0].innerHTML] = [colorOptions[6].innerHTML];
    colorDict[designOptions[1].innerHTML] = [colorOptions[0].innerHTML, colorOptions[1].innerHTML, colorOptions[2].innerHTML];
    colorDict[designOptions[2].innerHTML] = [colorOptions[3].innerHTML, colorOptions[4].innerHTML, colorOptions[5].innerHTML];
}

function populateShirtLists() {
    const designSelection = designSelect.options[designSelect.selectedIndex].innerHTML;

    while(colorSelect.options.length) {
        colorSelect.remove(0);
    }

    const colors = colorDict[designSelection];

    if(colors) {

        for(let i = 0; i < colors.length; i++) {
            const color = new Option(colors[i], i);
            colorSelect.options.add(color);
        }
    }
}

function createCostText() {
    const totalCostParagraph = document.createElement("p");
    const totalCostText = document.createTextNode(`Total cost: $${activitiesCost}`);

    totalCostParagraph.appendChild(totalCostText);
    totalCostParagraph.setAttribute("id", "cost");
    activitySelect[0].appendChild(totalCostParagraph);
}

function updateCostText() {
    const costText = document.getElementById("cost");

    costText.innerHTML = `Total cost: $${activitiesCost}`;
    costText.style.display = activitiesCost ? "block" : "none";
}

function adjustCost(activityIndex) {
    const adjustment = activityIndex ? 100 : 200;
    activitiesCost += activitiesSelections[activityIndex].checked ? adjustment : adjustment * -1;
}

function toggleConflict(element, state) {
    state ? element.classList.add("conflict") : element.classList.remove("conflict");
}

function checkAvailability(activityIndex) {
    switch(activityIndex) {
        case 1:
            activitiesSelections[3].disabled = activitiesSelections[activityIndex].checked;
            toggleConflict(activitiesSelections[3].parentNode, activitiesSelections[3].disabled);
            break;
        case 2:
            activitiesSelections[4].disabled = activitiesSelections[activityIndex].checked;
            toggleConflict(activitiesSelections[4].parentNode, activitiesSelections[4].disabled);
            break;
        case 3:
            activitiesSelections[1].disabled = activitiesSelections[activityIndex].checked;
            toggleConflict(activitiesSelections[1].parentNode, activitiesSelections[1].disabled);
            break;
        case 4:
            activitiesSelections[2].disabled = activitiesSelections[activityIndex].checked;
            toggleConflict(activitiesSelections[2].parentNode, activitiesSelections[2].disabled);
            break;
        default:
            break;
    }
}

function createWarnings() {
    const nameWarning = document.createElement("span");
    nameWarning.setAttribute("id", "name-warning");
    nameWarning.classList.add("jn-warning");
    const nameWarningText = document.createTextNode(`Can only contain letters and spaces`);
    const nameInput = document.getElementById("name");
    nameWarning.appendChild(nameWarningText);
    nameInput.insertAdjacentElement("afterend", nameWarning);

    const emailWarning = document.createElement("span");
    emailWarning.setAttribute("id", "email-warning");
    emailWarning.classList.add("jn-warning");
    const emailWarningText = document.createTextNode(`Valid email address required.`);
    const emailInput = document.getElementById("mail");
    emailWarning.appendChild(emailWarningText);
    emailInput.insertAdjacentElement("afterend", emailWarning);

    const cardNumberWarning = document.createElement("span");
    cardNumberWarning.setAttribute("id", "card-number-warning");
    cardNumberWarning.classList.add("jn-warning");
    const cardWarningText = document.createTextNode(`Must be 13 - 16 digits`);
    const cardNumberInput = document.getElementById("cc-num");
    cardNumberWarning.appendChild(cardWarningText);
    cardNumberInput.insertAdjacentElement("afterend", cardNumberWarning);

    const zipCodeWarning = document.createElement("span");
    zipCodeWarning.setAttribute("id", "zip-warning");
    zipCodeWarning.classList.add("jn-warning");
    const zipCodeWarningText = document.createTextNode(`Must be 5 digits`);
    const zipCodeInput = document.getElementById("zip");
    zipCodeWarning.appendChild(zipCodeWarningText);
    zipCodeInput.insertAdjacentElement("afterend", zipCodeWarning);

    const cvvWarning = document.createElement("span");
    cvvWarning.setAttribute("id", "cvv-warning");
    cvvWarning.classList.add("jn-warning");
    const cvvWarningText = document.createTextNode(`Must be 3 digits`);
    const cvvInput = document.getElementById("cvv");
    cvvWarning.appendChild(cvvWarningText);
    cvvInput.insertAdjacentElement("afterend", cvvWarning);

    hideAllWarnings();
}

function hideAllWarnings() {
    const warningIds = ["name-warning", "email-warning", "card-number-warning", "zip-warning", "cvv-warning"];

    for(let warning of warningIds) {
        document.getElementById(warning).style.display = "none";
    }
}

function toggleWarning(show, warning) {
    warning.style.display = show ? "inherit" : "none";
}

function selectCreditCard() {
    document.getElementById("payment").value = "credit card";
    document.getElementById("credit-card").style.display = "block";
}


// ========================
// Event Listeners
// ========================

// Job role
jobRoleSelect.addEventListener("change", function() {
    displayOtherField(this.value == "other" ? "block" : "none");
});

// T-Shirt info
designSelect.addEventListener("change", populateShirtLists);

// Activity Registration
function listenToActivitySelection() {
    for(let i = 0; i < activitiesSelections.length; i++) {
        activitiesSelections[i].addEventListener("click", function() {
            adjustCost(i);
            updateCostText(i);
            checkAvailability(i);
        });
    }
}

// Payment Info
paymentSelect.addEventListener("change", function() {
    resetDefaultPayment();
    let id = this.value;
    if(id == "credit card") {
        id = "credit-card";
    }

    document.getElementById(id).style.display = "block";
});

function createListener(validator) {
    return e => {
        const text = e.target.value;
        const valid = validator(text);
        const showWarning = text !== "" && !valid;
        const warning = e.target.nextElementSibling;
        toggleWarning(showWarning, warning);
    };
}

document.getElementById("name").addEventListener("input", createListener(isValidName));
document.getElementById("mail").addEventListener("input", createListener(isValidEmail));
document.getElementById("cc-num").addEventListener("input", createListener(isValidCardNumber));
document.getElementById("zip").addEventListener("input", createListener(isValidZipcode));
document.getElementById("cvv").addEventListener("input", createListener(isValidCVV));


// ================
// Validators
// ================

function isValidName(name) {
    return /^\D+$/.test(name);
}

function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function isValidCardNumber(cardNumber) {
    return /^\d{13,16}D*$/.test(cardNumber);
}

function isValidZipcode(zipcode) {
    return /^\d{5}$/.test(zipcode);
}

function isValidCVV(cvv) {
    return /^\d{3}$/.test(cvv);
}





