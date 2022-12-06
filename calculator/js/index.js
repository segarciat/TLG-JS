const calcContainer = document.querySelector(".calculator-container");
const calcInput = document.getElementById("calcInput");
const BTN_ATTRIBUTE_KEY = "data-calc-key";
const BACKSPACE_KEY = "backspace";
const DELETE_KEY = "delete";
const ENTER_KEY = "enter";
const CLEAR_KEY = "clear";
const VALID_OPS = "+-*/%".split("");

calcContainer.addEventListener("keydown", processKeydown);
document.querySelectorAll(".button-row button").forEach((button) => {
  button.addEventListener("click", processClick);
});

function processClick(e) {
  const btn = e.target.closest("button");
  updateCalcInput(btn.getAttribute(BTN_ATTRIBUTE_KEY));
  calcInput.focus();
}

function processKeydown(e) {
  updateCalcInput(e.key);
}

function updateCalcInput(key) {
  key = key.toLowerCase();
  if (!isNaN(key) || VALID_OPS.includes(key)) {
    calcInput.value += key;
  } else if (calcInput.value && (key === BACKSPACE_KEY || key === DELETE_KEY)) {
    calcInput.value = calcInput.value.slice(0, calcInput.value.length - 1);
  } else if (key === ENTER_KEY) {
    console.log(calcInput.value);
  }
}
