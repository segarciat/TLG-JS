// Find DOM element and hold onto it, so we don't have to search for it
// every time we use it.
const calcForm = document.getElementById("calcForm");
const amountInput = document.getElementById("loanAmount");
const yearsInput = document.getElementById("termYears");
const rateInput = document.getElementById("yearlyRate");
const resultArea = document.getElementById("monthlyPayments");

/** Retrieve form values. Returns object: {amount, years, rate}. */

function getFormValues() {
  return {
    amount: Number(amountInput.value),
    years: Number(yearsInput.value),
    rate: Number(rateInput.value),
  };
}

/** Calculate monthly payment and return. */

function calcMonthlyPayment(amount, years, rate) {
  const P = amount;
  const n = years * 12; // total number of payments.
  const i = rate / 100 / 12; // yearly interest rate as a decimal
  return (P * i) / (1 - Math.pow(1 + i, -n));
}

/** Get form values, calculate, format to 2 decimal places, and display. */

function getFormValuesAndDisplayResults(e) {
  e.preventDefault();
  const { amount, years, rate } = getFormValues();
  const monthlyPayments = calcMonthlyPayment(amount, years, rate).toFixed(2);
  resultArea.textContent = `$${monthlyPayments}`;
}

/** Set initial form values and show initial results. Called at app start. */

function setInitialValues() {
  amountInput.value = 10000;
  yearsInput.value = 10;
  rateInput.value = 4.5;
}

/** Start: set form defaults & display; attach form submit event listener. */

function start() {
  calcForm.addEventListener("submit", getFormValuesAndDisplayResults);
  setInitialValues();
  calcForm.requestSubmit();
}

start();
