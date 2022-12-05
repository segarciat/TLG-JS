// Grab HTML elements.
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const secondElement = document.getElementById("seconds");

// Global state.
let startTime;
let pauseTime;
let timerId;

// Event Listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", togglePause);
resetBtn.addEventListener("click", resetTimer);

function startTimer(e) {
  // Hide start btn.
  startBtn.classList.add("d-none");

  // Show other buttons.
  pauseBtn.classList.remove("d-none");
  resetBtn.classList.remove("d-none");
  startTime = Date.now();

  // Start running timer.
  timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = `${Math.floor((Date.now() - startTime) / 1000)}`;
  secondElement.textContent = currentTime.padStart(2, "0");
}

function togglePause() {
  if (timerId) {
    pauseTimer();
  } else {
    resumeTimer();
  }
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
  pauseBtn.textContent = "Resume";
  pauseTime = Date.now();
}

function resumeTimer() {
  // Shift time up based on elapsed time.
  const now = Date.now();
  startTime += now - pauseTime;

  const currentMilliseconds = (now - startTime) % 1000;
  setTimeout(function () {
    updateTimer();
    // Start updating every second again.
    timerId = setInterval(updateTimer, 1000);
  }, 1000 - currentMilliseconds);
  pauseBtn.textContent = "Pause";
}

function resetTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  resetBtn.classList.add("d-none");
  pauseBtn.classList.add("d-none");
  pauseBtn.textContent = "Pause";
  startBtn.classList.remove("d-none");
  startTime = null;
  pauseTime = null;
  secondElement.textContent = "00";
}
