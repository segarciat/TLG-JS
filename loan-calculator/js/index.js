// Find DOM element and hold onto it, so we don't have to search for it
// every time we use it.
const calcForm = document.getElementById("calcForm");
const amountInput = document.getElementById("loanAmount");
const yearsInput = document.getElementById("termYears");
const rateInput = document.getElementById("yearlyRate");
const resultArea = document.getElementById("monthlyPayments");

/** Retrieve form values. Returns object: {amount, years, rate}. */

function getFormValues() {}

/** Calculate monthly payment and return. */

function calcMonthlyPayment(amount, years, rate) {}

/** Get form values, calculate, format to 2 decimal places, and display. */

function getFormValuesAndDisplayResults() {}

/** Set initial form values and show initial results. Called at app start. */

function setInitialValues() {}

/** Start: set form defaults & display; attach form submit event listener. */

function start() {}
