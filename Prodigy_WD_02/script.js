// === script.js ===
let startTime, updatedTime, difference, timerInterval;
let running = false;
let laps = [], countdown = false, countdownTarget = 60000;
let formatMs = true;
const display = document.getElementById("display");
const lapList = document.getElementById("laps");
const lapChart = document.getElementById("lapChart").getContext("2d");
const soundSelect = document.getElementById("soundSelect");

const sounds = {
  default: new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"),
  tick: new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"),
  beep: new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg")
};

function updateDisplay(ms) {
  let time = ms;
  let milliseconds = parseInt((time % 1000));
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)));
  display.innerText =
    `${hours.toString().padStart(2, '0')}:` +
    `${minutes.toString().padStart(2, '0')}:` +
    `${seconds.toString().padStart(2, '0')}` +
    (formatMs ? "." + milliseconds.toString().padStart(3, '0') : "");
}

function startTimer() {
  startTime = Date.now() - (difference || 0);
  timerInterval = setInterval(() => {
    updatedTime = Date.now();
    difference = countdown ? countdownTarget - (updatedTime - startTime) : updatedTime - startTime;
    updateDisplay(Math.max(difference, 0));

    if (countdown && difference <= 0) {
      clearInterval(timerInterval);
      running = false;
      playSound();
      document.getElementById("startPause").innerText = "▶️ Start";
    }
  }, 10);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  startTime = null;
  difference = 0;
  updateDisplay(0);
  laps = [];
  localStorage.removeItem("laps");
  lapList.innerHTML = "";
  running = false;
  renderChart();
}

function lapTime() {
  if (!running) return;
  laps.push(difference);
  localStorage.setItem("laps", JSON.stringify(laps));
  const li = document.createElement("li");
  li.innerText = formatLapTime(difference);
  lapList.appendChild(li);
  playSound();
  renderChart();
}

function formatLapTime(ms) {
  let d = new Date(ms);
  return d.toISOString().substr(11, formatMs ? 12 : 8);
}

function playSound() {
  const selected = soundSelect.value;
  const sound = sounds[selected] || sounds["default"];
  sound.play();
  display.classList.add("pulse");
  setTimeout(() => display.classList.remove("pulse"), 300);
}

function renderChart() {
  if (!window.lapChartInstance) {
    window.lapChartInstance = new Chart(lapChart, {
      type: 'line',
      data: { labels: [], datasets: [{ label: 'Lap Times', data: [], borderColor: '#00ffe0', fill: false }] },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }
  const chart = window.lapChartInstance;
  chart.data.labels = laps.map((_, i) => `Lap ${i + 1}`);
  chart.data.datasets[0].data = laps;
  chart.update();
}

// DOM Listeners
document.getElementById("startPause").onclick = () => {
  if (!running) {
    startTimer();
    running = true;
    document.getElementById("startPause").innerText = "⏸ Pause";
    document.getElementById("lap").disabled = false;
    document.getElementById("reset").disabled = false;
  } else {
    pauseTimer();
    running = false;
    document.getElementById("startPause").innerText = "▶️ Start";
  }
};

document.getElementById("reset").onclick = resetTimer;

document.getElementById("lap").onclick = lapTime;

document.getElementById("countdownToggle").onclick = () => {
  countdown = !countdown;
  document.getElementById("countdownToggle").innerText = countdown ? "⏲ Mode: Countdown" : "🔁 Mode: Stopwatch";
};

document.getElementById("exportCsv").onclick = () => {
  const csv = laps.map((t, i) => `Lap ${i + 1},${formatLapTime(t)}`).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "lap_times.csv";
  a.click();
  URL.revokeObjectURL(url);
};

document.getElementById("toggleFormat").onclick = () => {
  formatMs = !formatMs;
};

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("light-mode");
};

window.onload = () => {
  laps = JSON.parse(localStorage.getItem("laps")) || [];
  laps.forEach(lap => {
    const li = document.createElement("li");
    li.innerText = formatLapTime(lap);
    lapList.appendChild(li);
  });
  renderChart();
};
