const runner = document.getElementById('runner');
const status = document.getElementById('status');
const countdown = document.getElementById('countdown');
const finish = document.getElementById('finish');

let position = 0;
let step = 50;
let jump = false;

const finishPosition = finish.offsetLeft - 50;

function breatheStep() {
  if (position >= finishPosition) {
    runner.style.left = `${finishPosition}px`;
    status.textContent = "🎉 You reached the finish line!";
    clearInterval(breathTimer);
    return;
  }

  if (jump) {
    runner.classList.add('jump');
    status.textContent = "😮‍💨 Exhale - Jump!";
    setTimeout(() => runner.classList.remove('jump'), 400);
  } else {
    position += step;
    runner.style.left = `${position}px`;
    status.textContent = "😤 Inhale - Run!";
  }

  jump = !jump;
}

let breathTimer;

function startRace() {
  let countdownVal = 3;
  countdown.textContent = `Starting in ${countdownVal}...`;
  const timer = setInterval(() => {
    countdownVal--;
    if (countdownVal === 0) {
      clearInterval(timer);
      countdown.textContent = '';
      status.textContent = "Let's go!";
      breathTimer = setInterval(breatheStep, 3000);
    } else {
      countdown.textContent = `Starting in ${countdownVal}...`;
    }
  }, 1000);
}

startRace();



