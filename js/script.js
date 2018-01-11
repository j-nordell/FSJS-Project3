"use strict";
// Project 3 - Full Stack JavaScript Techdegree
// Form traversal and validation
// Jennifer Nordell
/* jshint browser: true */


// ========================
// Global variables and constants
// ========================

const mainForm = document.getElementsByTagName("form")[0];

// input fields
const nameField = document.getElementById("name");
const emailField = document.getElementById("mail");
const ccField = document.getElementById("cc-num");
const zipField = document.getElementById("zip");
const cvvField = document.getElementById("cvv");

// Select
const jobRoleSelect = document.getElementById("title");
const designSelect = document.getElementById("design");
const designOptions = designSelect.getElementsByTagName("option");
const colorSelect = document.getElementById("color");
const activitySelect = document.getElementsByClassName("activities");
const mainActivity = document.getElementsByName("all")[0];
const activitiesSelections = activitySelect[0].getElementsByTagName("input");
const paymentSelect = document.getElementById("payment");
const registerButton = document.getElementsByTagName("button")[0];

// Form warning and error arrays
const warningIds = ["name-warning", "email-warning", "card-number-warning", "zip-warning", "cvv-warning"];
const errorIds = ["name-error", "mail-error", "activity-error", "cc-num-error", "zip-error", "cvv-error"];

// Misc
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
displayColorMenu("none");
createWarnings();
createErrors();
resetActivities();
listenToActivitySelection();
createCostText();
updateCostText();
removeSelectPaymentOption();
selectCreditCard();

// ===============================
// Warning and Error Creations
// ===============================

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

function createErrors() {
    const nameError = document.createElement("div");
    const nameErrorText = document.createTextNode("\u26A0 Name is required");
    nameError.setAttribute("id","name-error");
    nameError.classList.add("error");
    nameError.appendChild(nameErrorText);
    nameField.parentNode.insertBefore(nameError, nameField);

    const emailError = document.createElement("div");
    const emailErrorText = document.createTextNode("\u26A0 Email is required");
    emailError.setAttribute("id", "mail-error");
    emailError.classList.add("error");
    emailError.appendChild(emailErrorText);
    emailField.parentNode.insertBefore(emailError, emailField);

    const activityError = document.createElement("div");
    const activityErrorText = document.createTextNode("\u26A0 At least one activity must be selected");
    activityError.setAttribute("id", "activity-error");
    activityError.classList.add("error");
    activityError.appendChild(activityErrorText);
    mainActivity.parentNode.insertBefore(activityError, mainActivity);

    const ccError = document.createElement("div");
    const ccErrorText = document.createTextNode("\u26A0 Required field");
    ccError.setAttribute("id", "cc-num-error");
    ccError.classList.add("error");
    ccError.appendChild(ccErrorText);
    ccField.parentNode.insertBefore(ccError, ccField);

    const zipError = document.createElement("div");
    const zipErrorText = document.createTextNode("\u26A0 Required field");
    zipError.setAttribute("id","zip-error");
    zipError.classList.add("error");
    zipError.appendChild(zipErrorText);
    zipField.parentNode.insertBefore(zipError, zipField);

    const cvvError = document.createElement("div");
    const cvvErrorText = document.createTextNode("\u26A0 Required field");
    cvvError.setAttribute("id", "cvv-error");
    cvvError.classList.add("error");
    cvvError.appendChild(cvvErrorText);
    cvvField.parentNode.insertBefore(cvvError, cvvField);

    hideAllErrors();
}

// ========================
// Helper functions
// ========================

function setFocusOnElement(element) {
    element.focus();
}

function displayOtherField(setting) {
    document.getElementById("other-title").style.display = setting;
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

function displayColorMenu(displayStyle) {
    document.getElementById("colors-js-puns").style.display = displayStyle;
}

function createCostText() {
    const totalCostParagraph = document.createElement("p");
    const totalCostText = document.createTextNode(`Total cost: $${activitiesCost}`);

    totalCostParagraph.appendChild(totalCostText);
    totalCostParagraph.setAttribute("id", "cost");
    activitySelect[0].appendChild(totalCostParagraph);
}

function resetActivities() {
    activitiesCost = 0;
    for(let i = 0; i < activitiesSelections.length; i++) {
        activitiesSelections[i].checked = false;
    }

}

function updateCostText() {
    const costText = document.getElementById("cost");
    const activityError = document.getElementById("activity-error");

    costText.innerHTML = `Total cost: $${activitiesCost}`;
    costText.style.display = activitiesCost ? "block" : "none";
    
    // activitiesCost == 0 ? toggleError(true, "activity-error") : toggleError(false, "activity-error");
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

function hideAllWarnings() {
    for(let warning of warningIds) {
        document.getElementById(warning).style.display = "none";
    }
}

function toggleWarning(show, warning) {
    warning.style.display = show ? "inherit" : "none";
}

// Specifically to clear just the CC errors in case payment method is changed from default
function clearCCErrors() {
    document.getElementById("cc-num-error").style.display = "none";
    document.getElementById("zip-error").style.display = "none";
    document.getElementById("cvv-error").style.display = "none";
}

function hideAllErrors() {
    for(let error of errorIds) {
        document.getElementById(error).style.display = "none";
    }
}

function toggleError(show, error) {
    document.getElementById(error).style.display = show ? "inherit" : "none";
}

function removeSelectPaymentOption() {
   paymentSelect.remove(0);
}

function selectCreditCard() {
    document.getElementById("payment").value = "credit card";
    document.getElementById("credit-card").style.display = "block";
}

function checkFields() {
    activitiesCost == 0 ? toggleError(true, "activity-error") : toggleError(false, "activity-error");
    nameField.focus();
    nameField.blur();
    emailField.focus();
    emailField.blur();
    if(paymentSelect.value == "credit card"){
        ccField.focus();
        ccField.blur();
        zipField.focus();
        zipField.blur();
        cvvField.focus();
        cvvField.blur();
    }
}

function validateForm() {
    checkFields();
    for(let error of errorIds) {
        if(document.getElementById(error).style.display != "none") {
            return false;
        }
    }

    for(let warning of warningIds) {
        if(document.getElementById(warning).style.display != "none") {
            return false;
        }
    }
    return true;
}


// ========================
// Event Listeners
// ========================

// Job role
jobRoleSelect.addEventListener("change", (e) => {
    displayOtherField(e.target.value == "other" ? "block" : "none");
});

// T-Shirt info
// designSelect.addEventListener("change", populateShirtLists);
designSelect.addEventListener("change", (e) => {
    populateShirtLists();
    designSelect.value == "select theme" ? displayColorMenu("none") : displayColorMenu("block");
});

// Activity Registration
function listenToActivitySelection() {
    for(let i = 0; i < activitiesSelections.length; i++) {
        activitiesSelections[i].addEventListener("click", (e) => {
            adjustCost(i);
            updateCostText(i);
            checkAvailability(i);
        });
    }
}

// Payment Info
paymentSelect.addEventListener("change", (e) => {
    resetDefaultPayment();
    let id = e.target.value;
    if(id == "credit card") {
        id = "credit-card";
    } else {
        clearCCErrors();
    }

    document.getElementById(id).style.display = "block";
});

function createInputListener(validator) {
    return e => {
        const text = e.target.value;
        const valid = validator(text);
        const showWarning = text !== "" && !valid;
        const warning = e.target.nextElementSibling;
        toggleError(false, e.target.id + "-error");
        toggleWarning(showWarning, warning);
    };
}

function createBlurListener() {
    return e => {
        const text = e.target.value;
        const showError = text === "";
        let errorName = "";
        switch(e.target.id) {
            case "name":
                errorName = "name-error";
                break;
            case "mail":
                errorName = "mail-error";
                break;
            case "cc-num":
                errorName = "cc-num-error";
                break;
            case "zip":
                errorName = "zip-error";
                break;
            case "cvv":
                errorName = "cvv-error";
                break;
            default:
                break;
        }
        toggleError(showError, errorName);
    };
}

registerButton.addEventListener('click', (e) => {
    let validForm = validateForm();

    if(!validForm) { 
        e.preventDefault();
    }
});

// creation of event listeners to validate fields
nameField.addEventListener("input", createInputListener(isValidName));
emailField.addEventListener("input", createInputListener(isValidEmail));
ccField.addEventListener("input", createInputListener(isValidCardNumber));
zipField.addEventListener("input", createInputListener(isValidZipcode));
cvvField.addEventListener("input", createInputListener(isValidCVV));

nameField.addEventListener("blur", createBlurListener());
emailField.addEventListener("blur", createBlurListener());
ccField.addEventListener("blur", createBlurListener());
zipField.addEventListener("blur", createBlurListener());
cvvField.addEventListener("blur", createBlurListener());

// ================
// Validators
// ================

function isValidName(name) {
    return /^[a-zA-Z][a-zA-Z\s]*$/.test(name);
}

function isValidEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
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

