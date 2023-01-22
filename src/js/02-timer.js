import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
  opacity: 0.8,
  timeout: 2500,
  clickToClose: true,
});

const display = document.querySelector('.timer');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const inputTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

display.style.display = 'flex';
display.style.gap = '20px';

startBtn.disabled = true;
let selectedDate;
let intervalId;
let timerWorking;

// Об'єкт flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    clearInterval(intervalId);

    if (selectedDate > Date.now()) {
      startBtn.disabled = false;

      if (timerWorking) {
        timerWorking = false;
        Notiflix.Notify.failure('Timer was stopped');
      }
    } else {
      Notiflix.Notify.warning('Please choose a date in the future');
    }
  },
};

flatpickr(inputTime, options);

startBtn.addEventListener('click', startTimer);

function startTimer() {
  startBtn.disabled = true;
  timerWorking = true;
  Notiflix.Notify.info('Here we go!');

  intervalId = setInterval(() => {
    const remainingTime = selectedDate - Date.now();
    const remainingDate = convertMs(remainingTime);

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      timerWorking = false;
      Notiflix.Notify.success('We have reached the destination date!');
      return;
    } else {
      days.textContent = remainingDate.days;
      hours.textContent = remainingDate.hours;
      minutes.textContent = remainingDate.minutes;
      seconds.textContent = remainingDate.seconds;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
