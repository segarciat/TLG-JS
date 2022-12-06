const userInput = document.getElementById("user-input");

userInput.addEventListener("keydown", validateKeypress);
document.querySelectorAll(".button-row button").forEach((button) => {
  button.addEventListener("click", processClick);
});

function processClick(e) {
  console.log(e.target);
}

function validateKeypress(e) {
  //   console.log(e.key);
  if (!isNaN(e.key)) {
    e.target.value += e.key;
  }
}
