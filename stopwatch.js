const TimeDisplay = document.querySelector("#display");
const startbutton = document.querySelector("#startbut");
const resetbutton = document.querySelector("#resetbut");
const pausebutton = document.querySelector("#pausebut");

let hours = 0;
let mins = 0;
let secs = 0;
let intervalID;
let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;

startbutton.addEventListener("click", TimeStart);
pausebutton.addEventListener("click", TimePause);
resetbutton.addEventListener("click", TimeReset);

function TimeStart(){
  if(paused){
    paused = false;
    startTime = Date.now() - elapsedTime;
    intervalID = setInterval(updateTime, 75);
  }
};
function TimePause(){
  if(!paused){
    paused = true;
    elapsedTime = Date.now() - startTime;
    clearInterval(intervalID);
  }
};
function TimeReset(){
  clearInterval(intervalID);
  paused = true;
  hours = 0;
  secs = 0;
  mins = 0;
  currentTime = 0;
  startTime = 0;
  elapsedTime = 0;
  TimeDisplay.textContent = `00:00:00`;
}
function updateTime(){
  elapsedTime = Date.now() - startTime;
  secs = Math.floor((elapsedTime) / 1000 % 60);
  mins = Math.floor(elapsedTime / (1000 * 60) % 60);
  hours = Math.floor((elapsedTime) / (1000 * 60 * 60) % 60);

  secs = pad(secs);
  mins = pad(mins);
  hours = pad(hours);

  TimeDisplay.textContent = `${hours}:${mins}:${secs}`;

  function pad(unit){
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  };
}