// const startBtn = document.querySelector('[data-start]');
// const stopBtn = document.querySelector('[data-stop]');
// const body = document.querySelector('body');

// startBtn.addEventListener('click', colorSwitchStart);
// stopBtn.addEventListener('click', colorSwitchStop);

// let intervalId;
// function colorSwitchStart() {
//   startBtn.disabled = true;
//   stopBtn.disabled = false;
//   intervalId = setInterval(() => {
//     body.style.backgroundColor = getRandomHexColor();
//   }, 1000);
// }

// function colorSwitchStop() {
//   startBtn.disabled = false;
//   stopBtn.disabled = true;
//   clearInterval(intervalId);
// }

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let timerID;
startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopbuttonClick);
function onStartButtonClick() {
  timerId = setInterval(getRandomHexColor, 1000);
  startButton.setAttribute('disabled', true);
}
function onStopbuttonClick() {
  startButton.removeAttribute('disabled');
  clearInterval(timerId);
}
function getRandomHexColor() {
  body.style.backgroundColor = `#${Math.floor(
    Math.random() * 16777215
  ).toString(16)}`;
}
