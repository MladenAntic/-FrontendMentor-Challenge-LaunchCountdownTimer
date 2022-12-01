const timeLeft = document.querySelectorAll(".time-left");
const cardTop = document.querySelectorAll(".card-top");
const introTitle = document.querySelector('.intro-title')
const mainContainer = document.getElementById("main-container");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDate = new Date(2022, 8, 2, 11, 30, 0);
const futureDate = new Date(tempYear, tempMonth, tempDay + 99, 24, 68, 0);
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60min
  // 1d = 24hr

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }

    return item;
  }

  timeLeft.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  function flipSeconds() {
    cardTop[3].style.animation = "rotateCard 1s ease-in-out infinite";
    cardTop[3].style.transformOrigin = "bottom";
  }

  function flipMinutes() {
    cardTop[2].style.animation = "rotateCard 1s ease-in-out";
    cardTop[2].style.transformOrigin = "bottom";
  }

  function flipHours() {
    cardTop[1].style.animation = "rotateCard 1s ease-in-out";
    cardTop[1].style.transformOrigin = "bottom";
  }

  function flipDays() {
    cardTop[0].style.animation = "rotateCard 1s ease-in-out";
    cardTop[0].style.transformOrigin = "bottom";
  }

  flipSeconds();

  if (timeLeft[3].innerText === "00") {
    flipMinutes();
  }

  if (timeLeft[3].innerText === "00" && timeLeft[2].innerText === "00") {
    flipHours();
  }

  if (
    timeLeft[3].innerText === "00" &&
    timeLeft[2].innerText === "00" &&
    timeLeft[1].innerText === "00"
  ) {
    flipDays();
  }
  if (
    t < 0
  ) {
    clearInterval(countdown);
    introTitle.innerText = 'Looks like the countdown has ended :)'
    mainContainer.innerHTML =
      `<div class="countdown-end" style="display: flex; flex-direction: column; gap: 20px;">
        <a href="https://github.com/MladenAntic/FrontendMentor-Challenge-LaunchCountdownTimer" class="create-link"> View Solution Code </a>
        <a href="https://www.frontendmentor.io/solutions/launch-countdown-timer-7wwtRQjhlJ" class="create-link"> View Solution on FEM </a>
        <a href="https://www.frontendmentor.io/profile/MladenAntic" class="create-link"> Visit My FEM Profile </a>
      </div>`;
  }
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
