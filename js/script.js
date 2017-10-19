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
const paymentSelect = document.getElementById("payment");
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
createWarnings();


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

function checkAvailability(activityIndex) {
    switch(activityIndex) {
        case 1:
            if(activitiesSelections[activityIndex].checked) {
                activitiesSelections[3].disabled = true;
            } else {
                activitiesSelections[3].disabled = false;
            }
            break;
        case 2:
            if(activitiesSelections[activityIndex].checked) {
                activitiesSelections[4].disabled = true;
            } else {
                activitiesSelections[4].disabled = false;
            }
            break;
        case 3: 
            if(activitiesSelections[activityIndex].checked) {
                activitiesSelections[1].disabled = true;
            } else {
                activitiesSelections[1].disabled = false;
            }
            break;
        case 4:
            if(activitiesSelections[activityIndex].checked) {
                activitiesSelections[2].disabled = true;
            } else {
                activitiesSelections[2].disabled = false;
            }
            break;
        default:
            break;
    }
}

function createWarnings() {
    let nameWarning = document.createElement("span");
    nameWarning.setAttribute("id", "name-warning");
    let nameWarningText = document.createTextNode(`Can only contain letters and spaces`);
    let nameInput = document.getElementById("name");
    nameWarning.appendChild(nameWarningText);
    nameInput.insertAdjacentElement("afterend", nameWarning);

    let emailWarning = document.createElement("span");
    emailWarning.setAttribute("id", "email-warning");
    let emailWarningText = document.createTextNode(`Valid email address required.`);
    let emailInput = document.getElementById("mail");
    emailWarning.appendChild(emailWarningText);
    emailInput.insertAdjacentElement("afterend", emailWarning);

    let cardNumberWarning = document.createElement("span");
    cardNumberWarning.setAttribute("id", "card-number-warning");
    let cardWarningText = document.createTextNode(`Must be 16 digits`);
    let cardNumberInput = document.getElementById("cc-num");
    cardNumberWarning.appendChild(cardWarningText);
    cardNumberInput.insertAdjacentElement("afterend", cardNumberWarning);

    let zipCodeWarning = document.createElement("span");
    zipCodeWarning.setAttribute("id", "zip-warning");
    let zipCodeWarningText = document.createTextNode(`Must be 5 digits`);
    let zipCodeInput = document.getElementById("zip");
    zipCodeWarning.appendChild(zipCodeWarningText);
    zipCodeInput.insertAdjacentElement("afterend", zipCodeWarning);

    let cvvWarning = document.createElement("span");
    cvvWarning.setAttribute("id", "cvv-warning");
    let cvvWarningText = document.createTextNode(`Must be 3 digits`);
    let cvvInput = document.getElementById("cvv");
    cvvWarning.appendChild(cvvWarningText);
    cvvInput.insertAdjacentElement("afterend", cvvWarning);

    hideAllWarnings();
}

function hideAllWarnings() {
    document.getElementById("name-warning").style.display = "none";
    document.getElementById("email-warning").style.display = "none";
    document.getElementById("card-number-warning").style.display ="none";
    document.getElementById("zip-warning").style.display = "none";
    document.getElementById("cvv-warning").style.display = "none";
}

function toggleWarning(show, warning) {
    if(show) {
        warning.style.display = "inherit";
    } else {
        warning.style.display = "none";
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
            adjustCost(i);
            updateCostText(i);
            checkAvailability(i);
        });
    }
}

// Payment Info
paymentSelect .addEventListener("change", function() {
    resetDefaultPayment();
    if(this.value == "credit card") {
        document.getElementById("credit-card").style.display = "block";
    } else if(this.value == "paypal") {
        document.getElementById("paypal").style.display = "block";
    } else if(this.value == "bitcoin") {
        document.getElementById("bitcoin").style.display = "block";
    }
});

function createListener(validator) {
    return e => {
        const text = e.target.value;
        const valid = validator(text);
        const showWarning = text !== "" && !valid;
        const warning = e.target.nextElementSibling;
        toggleWarning(showWarning, warning);
    }
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
    return  /^\D+$/.test(name);
}

function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function isValidCardNumber(cardNumber) {
    return /^\D*\d{4}\D*\D*\d{4}\D*\d{4}\D*\d{4}D*$/.test(cardNumber);
}

function isValidZipcode(zipcode) {
    return /^\d{5}$/.test(zipcode);
}

function isValidCVV(cvv) {
    return /^\d{3}$/.test(cvv);
} 