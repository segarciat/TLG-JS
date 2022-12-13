"use strict";
const BTN_ATTRIBUTE_KEY = "data-calc-key";

/**
 * Calculator keys.
 */
const BACKSPACE_KEY = "backspace";
const DELETE_KEY = "delete";
const ENTER_KEY = "enter";
const CLEAR_KEY = "clear";
const ERROR_VAL = "ERROR";
const VALID_SYMBOLS = "+-*/%.()[]^".split("");

/**
 * Special button operations.
 */
const SQUARE_OP = "^2";
const SQRT_OP = "√";
const RECIPROCAL_OP = "reciprocal";
const PM_OP = "pm";

const SPECIAL_OPS = {
  [RECIPROCAL_OP]: "**(-1)",
  [SQUARE_OP]: "**2",
  [SQRT_OP]: "**(1/2)",
};

/**
 * Wire up event listeners
 */
const calcContainer = document.querySelector(".calculator-container");
const calcInput = document.getElementById("calcInput");
calcContainer.addEventListener("keydown", handleKeydown);
document.querySelectorAll(".button-row button").forEach((button) => {
  button.addEventListener("click", handleClick);
});

// Get clicked key and update input.
function handleClick(e) {
  const btn = e.target.closest("button");
  updateCalcInput(btn.getAttribute(BTN_ATTRIBUTE_KEY));
  calcInput.focus();
}

// Get typed key and update input.
function handleKeydown(e) {
  updateCalcInput(e.key);
}

// Update input according depending on whether key is valid.
function updateCalcInput(key) {
  if (calcInput.value === ERROR_VAL) calcInput.value = "";
  key = key.toLowerCase();
  if (!isNaN(key) || VALID_SYMBOLS.includes(key)) {
    calcInput.value += key;
  } else if (calcInput.value && (key === BACKSPACE_KEY || key === DELETE_KEY)) {
    calcInput.value = calcInput.value.slice(0, calcInput.value.length - 1);
  } else if (key === CLEAR_KEY) {
    calcInput.value = "";
  } else if (Object.keys(SPECIAL_OPS).includes(key)) {
    calcInput.value = `(${calcInput.value})${SPECIAL_OPS[key]}`;
    evaluateInput();
  } else if (calcInput.value && key === ENTER_KEY) {
    evaluateInput();
  }
}

// Display result in calculator if valid, or ERROR message otherwise.
function evaluateInput() {
  try {
    const result = eval(calcInput.value.replace("^", "**"));
    calcInput.value = result;
  } catch (e) {
    calcInput.value = ERROR_VAL;
  }
}
