const deg = 6;
const horArrow = document.querySelector("#hour-arrow");
const minArrow = document.querySelector("#minute-arrow");
const secArrow = document.querySelector("#second-arrow");
const digitalClock = document.querySelector("#digital-clock");
const englishButton = document.querySelector("#english");
const persianButton = document.querySelector("#persian");

let isEnglish = true;

englishButton.addEventListener("click", () => {
  if (!isEnglish) {
    isEnglish = true;
    updateClockLanguage();
  }
});

persianButton.addEventListener("click", () => {
  if (isEnglish) {
    isEnglish = false;
    updateClockLanguage();
  }
});

function updateClockLanguage() {
  let time = new Date();
  let hours = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();

  let midnight = "AM";

  if (hours == 0) {
    hours = 12;
    midnight = "AM";
  }
  if (hours > 12) {
    hours = hours - 12;
    midnight = "PM";
  }

  hours = hours < 10 ? "0" + hours : hours;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  let timeText = "";
  if (isEnglish) {
    timeText = hours + ":" + minute + ":" + second + " " + midnight;
    digitalClock.style.left = "44%";
  } else {
    timeText =
      convertToPersianDigits(hours) +
      ":" +
      convertToPersianDigits(minute) +
      ":" +
      convertToPersianDigits(second) +
      "";
    digitalClock.style.left = "40%";
  }

  digitalClock.innerText = timeText;
}

function convertToPersianDigits(number) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number.toString().replace(/\d/g, (digit) => persianDigits[digit]);
}

// Update clock language initially
updateClockLanguage();

setInterval(() => {
  let time = new Date();
  let hours = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();

  let hoursDgree = hours * 30;
  let minuteDgree = minute * deg;
  let secondDgree = second * deg;

  horArrow.style.transform = `rotateZ(${hoursDgree + minuteDgree / 12}deg)`;
  minArrow.style.transform = `rotateZ(${minuteDgree}deg)`;
  secArrow.style.transform = `rotateZ(${secondDgree}deg)`;
  updateClockLanguage();
}, 1000);

// تابعی برای به روزرسانی تاریخ فارسی
function updatePersianDate() {
  let date = new Date();
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour12: false,
    calendar: "persian",
  };
  let persianDate = new Intl.DateTimeFormat("fa-IR", options).format(date);
  document.getElementById("digital-date").innerText = persianDate;
}

// تابعی برای به روزرسانی تاریخ انگلیسی
function updateEnglishDate() {
  let date = new Date();
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric',
    hour12: true,
    calendar: "gregory",
  };
  let englishDate = new Intl.DateTimeFormat("en-US", options).format(date);
  document.getElementById("digital-date").innerText = englishDate;
}

// رویداد کلیک بر روی دکمه فارسی
document.getElementById("persian").addEventListener("click", function () {
  updatePersianDate();
});

// رویداد کلیک بر روی دکمه انگلیسی
document.getElementById("english").addEventListener("click", function () {
  updateEnglishDate();
});
updateEnglishDate();
