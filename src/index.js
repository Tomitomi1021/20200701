import "./styles.css";

let maxNum = 9;
let shuffleInterval = 3000;

let nextNumber;
let miss;
let startTime;
let shuffleTimer = null;

function init() {
  nextNumber = 1;
  miss = 0;
  for (let num = maxNum; num >= 1; num--) {
    let elm = document.createElement("button");
    elm.innerHTML = num;
    elm.setAttribute("id", num);
    elm.setAttribute("class", "circle");
    elm.setAttribute("onclick", "clicked(" + num + ")");
    document.getElementById("main").appendChild(elm);

    setColorRandomly(num);
    moveButtonRandomly(num);
    setSizeRandomly(num);
  }
  startTime = Date.now();
  if (shuffleTimer != null) {
    clearInterval(shuffleTimer);
  }
  shuffleTimer = setInterval(shuffle, shuffleInterval);
}

function moveButtonRandomly(no) {
  const obj = document.getElementById(no);
  if (obj == null) return;
  let left = 10 + Math.floor(Math.random() * 400);
  let top = 100 + Math.floor(Math.random() * 600);
  obj.style.left = left + "px";
  obj.style.top = top + "px";
}

function setSizeRandomly(no) {
  const obj = document.getElementById(no);
  if (obj == null) return;
  let size = 60 + Math.floor(Math.random() * 60) - 30;
  obj.style.width = size + "px";
  obj.style.height = size + "px";
}

function setColorRandomly(no) {
  const obj = document.getElementById(no);
  if (obj == null) return;
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  if (Math.max(red, green, blue) < 127) {
    obj.style.color = "white";
  } else {
    obj.style.color = "black";
  }
  obj.style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")";
}

function shuffle() {
  for (let n = nextNumber; n <= maxNum; n++) {
    moveButtonRandomly(n);
    setSizeRandomly(n);
    setColorRandomly(n);
  }
}

const clearBillboard = document.querySelector("#clear");
document.clicked = num => {
  if (num === nextNumber) {
    nextNumber++;
    document.remove(num);
    if (nextNumber === maxNum + 1) {
      let endTime = Date.now();
      clearBillboard.style.display = "block";
      document.querySelector("#config").style.display = "block";
      document.querySelector("#missCount").innerHTML = miss;
      document.querySelector("#clearTime").innerHTML =
        (endTime - startTime) / 1000;
      document.querySelector("#maxNumView").innerHTML = maxNum;
      document.querySelector(
        "#shuffleIntervalView"
      ).innerHTML = shuffleInterval;
      if (document.querySelector("#onclickShuffle").checked) {
        document.querySelector("#onclickShuffleView").innerHTML =
          "数字をクリックしたときもシャッフルする。";
      } else {
        document.querySelector("#onclickShuffleView").innerHTML =
          "数字をクリックしたときはシャッフルしない。";
      }
    }
  } else {
    miss++;
  }
  if (document.querySelector("#onclickShuffle").checked) {
    shuffle();
  }
};

const retryButton = document.querySelector("#retry");
retryButton.addEventListener("click", () => {
  clearBillboard.style.display = "none";
  document.querySelector("#config").style.display = "none";
  init();
});

document.remove = target => {
  document.getElementById("main").removeChild(document.getElementById(target));
};

document.querySelector("#shuffleInterval").addEventListener("input", event => {
  shuffleInterval = Math.floor(event.target.value);
});

document.querySelector("#maxNum").addEventListener("input", event => {
  maxNum = Math.floor(event.target.value);
});

document.querySelector("#start").addEventListener("click", () => {
  document.querySelector("#title").style.display = "none";
  document.querySelector("#config").style.display = "none";
  init();
});
