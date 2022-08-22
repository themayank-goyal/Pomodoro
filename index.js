'use strict';

const timerApp = document.querySelector('.timer');
const cycle = document.querySelector('.cycle');
const workMin = document.querySelector('.work__min');
const workSec = document.querySelector('.work__sec');
const workDiv = document.querySelector('.work');
const start = document.querySelector('.btnStart');
const reset = document.querySelector('.btnReset');
const stop = document.querySelector('.btnStop');
const processes = document.querySelectorAll('.step');
let sound = new Audio('./assets/sounds/Nature.mp3');
const wdSound = new Audio('./assets/sounds/workTimerOver.mp3');
const cancel = document.querySelector('.cancel');
const settingIcon = document.querySelector('.settings');

const settings = document.querySelector('.settings__popup');

const selectWorkTime = document.getElementById('selectWT');
const selectBreakTime = document.getElementById('selectBT');
const selectLongBreakTime = document.getElementById('selectLBT');
const btnDone = document.querySelector('.done');

let wt = 25;
let bt = 5;
let lbt = 15;

function time() {
  wt = selectWorkTime.value;
  bt = selectBreakTime.value;
  lbt = selectLongBreakTime.value;
}

const selectTheme = document.getElementById('selectTheme');
let theme = selectTheme.options[selectTheme.selectedIndex].text;

function themeOption() {
  theme = selectTheme.options[selectTheme.selectedIndex].text;
}

let startTimer = undefined;

cancel.addEventListener('click', function(){
  timerApp.classList.remove('hide');
  settings.classList.add('hide');
})

btnDone.addEventListener('click', function () {
  timerApp.classList.remove('hide');
  settings.classList.add('hide');
  workMin.innerHTML = wt;
  workSec.innerHTML = '00';
});

settingIcon.addEventListener('click', function () {
  if (startTimer == undefined) {
    timerApp.classList.add('hide');
    settings.classList.remove('hide');
  } else {
    alert('Timer is running, to open settings please stop the timer');
  }
});

start.addEventListener('click', StartMethod);
stop.addEventListener('click', StopMethod);
reset.addEventListener('click', ResetMethod);

function StartMethod() {
  sound = new Audio(`./assets/sounds/${theme}.mp3`);
  if (startTimer === undefined) {
    startTimer = setInterval(Timer, 1000);
  } else {
    alert('timer is already running');
  }
}

function StopMethod() {
  clearInterval(startTimer);
  startTimer = undefined;
  sound.pause();
}

function ResetMethod() {
  clearInterval(startTimer);
  startTimer = undefined;
  sound.pause();
  for (let i = 0; i < 3; i++) {
    if (i === 0) processes[i].classList.add('active');
    else processes[i].classList.remove('active');
  }
  workMin.innerHTML = wt;
  workSec.innerHTML = '00';
  cycle.innerHTML = 0;
}
let flag = 0;
function Timer() {
  sound.play();
  if (workSec.innerHTML != 0) {
    workSec.innerHTML--;
  } else if (workMin.innerHTML != 0) {
    workSec.innerHTML = 59;
    workMin.innerHTML--;
  } else {
    if (flag == 0) {
      flag = 1;
      for (let i = 0; i < 3; i++) {
        if (i === 1) processes[i].classList.add('active');
        else processes[i].classList.remove('active');
      }
      workMin.innerHTML = bt;
      workSec.innerHTML = 0;
      cycle.innerHTML++;
      if (cycle.innerHTML !== 0 && cycle.innerHTML % 2 == 0) {
        flag = 2;
      }
    } else if (flag == 1) {
      flag = 0;
      for (let i = 0; i < 3; i++) {
        if (i === 0) processes[i].classList.add('active');
        else processes[i].classList.remove('active');
      }
      workMin.innerHTML = wt;
      workSec.innerHTML = 0;
    }
    if (flag == 2) {
      flag = 1;
      for (let i = 0; i < 3; i++) {
        if (i === 2) processes[i].classList.add('active');
        else processes[i].classList.remove('active');
      }
      workMin.innerHTML = lbt;
      workSec.innerHTML = 0;
    }
  }
}
