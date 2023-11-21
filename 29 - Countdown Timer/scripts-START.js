let count;
const leftTime = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const formEl = document.querySelector("#custom");
function timer(seconds) {
  const now = Date.now();
  const endSeconds = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(endSeconds);
  count = setInterval(() => {
    seconds -= 1;
    displayTimeLeft(seconds);

    seconds == 0 && clearInterval(count);
  }, 1000);
}

function handleClick(e) {
  clearInterval(count);
  let seconds = this.dataset.time;
  timer(seconds);
}

function displayTimeLeft(seconds) {
  const min = parseInt(seconds / 60);
  const sec = seconds % 60;
  leftTime.innerHTML = `${min}:${sec < 10 ? 0 : ""}${sec}`;
}

function displayEndTime(msec) {
  const end = new Date(msec);
  const hour = end.getHours();
  const min = end.getMinutes();
  endTime.innerHTML = `Be Back At ${hour}:${min < 10 ? 0 : ""}${min}`;
}

buttons.forEach((button) => button.addEventListener("click", handleClick));

function handleSubmit(e) {
  e.preventDefault();
  const min = e.target.minutes.value;
  const sec = min * 60;
  timer(sec);
  this.reset();
}

formEl.addEventListener("submit", handleSubmit);
