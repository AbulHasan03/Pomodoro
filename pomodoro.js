const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const workTimeDuration = 1500; 
const breakTimeDuration = 300; 

let timeLeft = workTimeDuration;
let timerInterval;
let isWorkTime = true; 

function startTimer() {
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
  startBtn.disabled = true;
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  timerDisplay.textContent = `${minutes}:${seconds}`;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    if (isWorkTime) {
      document.getElementById('work-time').textContent = 'Break Time';
      timeLeft = breakTimeDuration;
      isWorkTime = false;
    } else {
      document.getElementById('work-time').textContent = 'Work Time';
      timeLeft = workTimeDuration;
      isWorkTime = true;
    }
    startTimer(); 
    return;
  }
  timeLeft--;
}

function resetTimer() {
  clearInterval(timerInterval);
  if (isWorkTime) {
    timeLeft = workTimeDuration;
  } else {
    timeLeft = breakTimeDuration;
  }
  timerDisplay.textContent = formatTime(timeLeft);
  startBtn.disabled = false;
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
