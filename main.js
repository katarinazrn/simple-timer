let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let resetButton = document.getElementById("reset");

let hoursInput = document.getElementById("hoursInput");
let minutesInput = document.getElementById("minutesInput");
let secondsInput = document.getElementById("secondsInput");

let hours = (initialHours = 0);
let minutes = (initialMinutes = 1);
let seconds = (initialSeconds = 30);

let paused = false;
let started = false;

let timerInput = document.getElementById("timerInput");

let timerInterval;

function startInterval() {
  disableEdit();

  timerInterval = setInterval(() => {
    setValues();

    if (hours == 0 && minutes == 0 && seconds == 0) {
      started = false;
      clearInterval(timerInterval);
      timerInput.classList.add('ended');
      pauseButton.style.display = "none";
      resetButton.style.display = "block";
    }

    seconds -= 1;
    if (seconds < 0) {
      seconds = 59;
    }

    if (seconds == 59) {
      minutes -= 1;
    }

    if (minutes < 0) {
      hours -= 1;
      minutes = 59;
    }

    if (hours < 0) {
      hours = 0;
    }
  }, 1000);
}

startButton.addEventListener("click", () => {
  started = true;
  timerInput.classList.remove('ended');

  timerInput.classList.add("start");
  setTimeout(() => {
    timerInput.classList.remove("start");
  }, 300);

  seconds -= 1;

  startInterval();

  startButton.style.display = "none";
  pauseButton.style.display = "block";
  resetButton.style.display = "block";
});

pauseButton.addEventListener("click", () => {
  paused = !paused;
  timerInput.classList.remove('ended');

  if (paused) {
    clearInterval(timerInterval);
    pauseButton.innerHTML = "Resume";
    disableEdit(false);
  } else {
    startInterval();
    pauseButton.innerHTML = "Pause";
    disableEdit();
  }
});

resetButton.addEventListener("click", () => {
  clearInterval(timerInterval);

  timerInput.classList.remove('ended');

  hours = initialHours;
  minutes = initialMinutes;
  seconds = initialSeconds;

  paused = false;
  pauseButton.innerHTML = "Pause";
  started = false;
  disableEdit(false);

  console.log(hours,minutes,seconds)
  setValues();

  pauseButton.style.display = "none";
  resetButton.style.display = "none";
  startButton.style.display = "block";
});

hoursInput.addEventListener("input", () => {
  timerInput.classList.remove('ended');
  hours = parseInt(hoursInput.value);
  hoursInput.value = formatNumber(hours, 99);
  setInitialValues();
});

minutesInput.addEventListener("input", () => {
  timerInput.classList.remove('ended');
  minutes = parseInt(minutesInput.value);
  minutesInput.value = formatNumber(minutes, 59);
  setInitialValues();
});

secondsInput.addEventListener("input", () => {
  timerInput.classList.remove('ended');
  seconds = parseInt(secondsInput.value);
  secondsInput.value = formatNumber(seconds, 59);
  setInitialValues();
});

function formatNumber(number, max) {
  if (isNaN(number)) {
    return "00";
  }
  if (number <= 0) {
    return "00";
  }
  if (number < 10) {
    return "0" + number;
  }
  if (number > max) {
    return max;
  }

  return number;
}

function setValues() {
  hoursInput.value = formatNumber(hours, 99);
  minutesInput.value = formatNumber(minutes, 59);
  secondsInput.value = formatNumber(seconds, 59);
}

function disableEdit(value = true) {
  hoursInput.disabled = value;
  minutesInput.disabled = value;
  secondsInput.disabled = value;
}

function setInitialValues() {
  if (!started) {
    initialHours = hours;
    initialMinutes = minutes;
    initialSeconds = seconds;
  }
}
