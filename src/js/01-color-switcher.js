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

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId;
startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick(evt) {
  startBtn.setAttribute('disabled', '');
  const isStopBtnActive = stopBtn.hasAttribute('disabled');

  if (isStopBtnActive) {
    stopBtn.removeAttribute('disabled', '');
  }
  intervalId = setInterval(bodyColorChange, 1000);
}

function bodyColorChange() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStopBtnClick(evt) {
  clearInterval(intervalId);
  stopBtn.setAttribute('disabled', '');
  startBtn.removeAttribute('disabled', '');
}
