const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}
function updateButton() {
  const status = this.paused ? "▶️" : "||";
  toggle.textContent = status;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function handleRange() {
  video[this.name] = this.value;
}
// video control
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
// toggle control
toggle.addEventListener("click", togglePlay);
// volume & playrate control
ranges.forEach((range) => range.addEventListener("change", handleRange));
ranges.forEach((range) => range.addEventListener("mousemove", handleRange));
// progress control
let mousedown = false;

progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
function handleMoveProgress(e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

progress.addEventListener(
  "mousemove",
  (e) => mousedown && handleMoveProgress(e)
);
