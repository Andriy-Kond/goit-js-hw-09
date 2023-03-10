import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
  opacity: 0.9,
  timeout: 4000,
  clickToClose: true,
  fontSize: '18px',
  messageMaxLength: 300,
});

const display = document.querySelector('.timer');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const inputTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

display.insertAdjacentHTML(
  'afterbegin',
  '<span>До часу настання залишилось: </span>'
);
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
    console.log('onClose --> selectedDate', selectedDate);

    clearInterval(intervalId);

    if (timerWorking) {
      timerWorking = false;
      Notiflix.Notify.failure('Timer was stopped');
    }

    if (selectedDate > Date.now()) {
      startBtn.disabled = false;
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
  if (selectedDate < Date.now()) {
    Notiflix.Notify.warning('Please choose a date in the future');
    return;
  }

  Notiflix.Notify.info(
    `Here we go!
    Next stop is ${selectedDate.toLocaleString()}`
  );

  intervalId = setInterval(() => {
    const remainingTime = selectedDate - Date.now();
    const remainingDate = convertMs(remainingTime);

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      timerWorking = false;
      startBtn.disabled = false;
      // console.log('startBtn.disabled', startBtn.disabled);
      Notiflix.Notify.success(
        'We have reached the destination date! Please select new date.'
      );
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
