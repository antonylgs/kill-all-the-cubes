let min = 0;
let sec = 0;
let msec = 0;

let timeout;

let stopped = true;

const start = () => {
  if (stopped) {
    stopped = false;
    runTime();
  }
};

const stop = () => {
  if (!stopped) {
    stopped = true;
    clearTimeout(timeout);
  }
};

const runTime = () => {
  if (stopped) return;

  msec = parseInt(msec);
  sec = parseInt(sec);
  min = parseInt(min);

  msec++;

  if (msec == 60) {
    msec = 0;
    sec++;
  }

  if (sec == 60) {
    sec = 0;
    min++;
  }

  if (msec < 10) {
    msec = "0" + msec;
  }

  if (sec < 10) {
    sec = "0" + sec;
  }

  if (min < 10) {
    min = "0" + min;
  }

  document.querySelector("#timer").textContent = `${min}:${sec}:${msec}`;

  timeout = setTimeout(runTime, 10);
};

const reset = () => {
  document.querySelector("#timer").textContent = "00:00:00";
  min = 0;
  sec = 0;
  msec = 0;
};

let hits = 0;

window.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll(".side").forEach((el) => {
    el.addEventListener("click", function (e) {
      e.target.style.display = "none";
      if (hits == 41) {
        stop();
        hits = 0;
        document.querySelector("#timer").style.fontSize = "50px";
        document.querySelector("#timer").style.position = "static";
      } else {
        hits++;
      }
    });
  });
});

document.querySelector("#reset").addEventListener("click", function () {
  hits = 0;
  document.querySelector("#timer").style.fontSize = "20px";
  document.querySelector("#timer").style.position = "absolute";
  stop();
  reset();
  document.querySelectorAll(".side").forEach((el) => {
    el.style.display = "block";
  });
  document.querySelector("#reset").style.display = "none";
  document.querySelector("#play").style.display = "block";
});

document.querySelector("#play").addEventListener("click", function () {
  hits = 0;
  start();
  document.querySelector("#play").style.display = "none";
  document.querySelector("#reset").style.display = "block";
  document.querySelectorAll(".side").forEach((el) => {
    el.style.display = "block";
  });
});
