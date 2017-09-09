// Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('.player__button');
const ranges = player.querySelectorAll('.player__slider');

// Handlers
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function handleSkip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange() {
  video[this.name] = parseFloat(this.value);
}

function handleProgress() {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function handleScrub(e) {
  video.currentTime = e.offsetX / progress.offsetWidth * video.duration;
}

// Events
toggle.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', handleProgress)

skipButtons.forEach(sb => sb.addEventListener('click', handleSkip));

ranges.forEach(r => r.addEventListener('click', handleRange));

let mousedown = false;

progress.addEventListener('click', handleScrub);
progress.addEventListener('mousemove', (e) => mousedown && handleScrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);