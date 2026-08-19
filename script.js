let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapList = document.getElementById("lapList");


// Start Stopwatch
startBtn.addEventListener("click", function() {

    if (timerInterval !== null) {
        return;
    }

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(function() {

        elapsedTime = Date.now() - startTime;

        displayTime(elapsedTime);

    }, 10);
});


// Pause Stopwatch
pauseBtn.addEventListener("click", function() {

    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
});


// Reset Stopwatch
resetBtn.addEventListener("click", function() {

    clearInterval(timerInterval);

    timerInterval = null;
    startTime = 0;
    elapsedTime = 0;

    display.textContent = "00:00:00.00";

    lapList.innerHTML = "";
});


// Record Lap
lapBtn.addEventListener("click", function() {

    if (elapsedTime === 0) {
        return;
    }

    const lapItem = document.createElement("li");

    lapItem.textContent = "Lap " + (lapList.children.length + 1)
        + " — " + formatTime(elapsedTime);

    lapList.appendChild(lapItem);
});


// Display Time
function displayTime(time) {

    display.textContent = formatTime(time);

}


// Format Time
function formatTime(time) {

    let milliseconds = Math.floor((time % 1000) / 10);

    let totalSeconds = Math.floor(time / 1000);

    let seconds = totalSeconds % 60;

    let minutes = Math.floor(totalSeconds / 60);

    let hours = Math.floor(minutes / 60);

    minutes = minutes % 60;


    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0")
    );
}