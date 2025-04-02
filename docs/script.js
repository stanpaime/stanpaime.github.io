//TODO: Add new difficulty

var header = document.getElementById("startHeader");
var myScore = document.getElementById("myTime");
var speedVal = document.getElementById("speedVal");
var time = 20;
var highScore = document.getElementById("highScore");
var id = null;
var resetId = null;
var timeId = null;
var started = false;
var ex = 5;
var ey = 5;
var spd1 = 0.3;
var spd2 = 0.6;
var spd3 = 1;
var currspd = spd1;
var elem = document.getElementById("gamePiece");
var hobs1 = document.getElementById("hobs1");
var hobs2 = document.getElementById("hobs2");
var hobs3 = document.getElementById("hobs3");
var vobs1 = document.getElementById("vobs1");
var vobs2 = document.getElementById("vobs2");
var vobs3 = document.getElementById("vobs3");
var vobs4 = document.getElementById("vobs4");
var vobs5 = document.getElementById("vobs5");
var winTile = document.getElementById("winTile");
var obstacles = [hobs1, hobs2, hobs3, vobs1, vobs2, vobs3, vobs4, vobs5];

var keypress = null;

function startGame() {
  gameArea.start();
}

var gameArea = {
  start: function () {
    console.log("GAME START");
    keypress = null;
    clearInterval(id);
    clearInterval(resetId);
    clearInterval(timeId);
    // timeId = setInterval(timer, 1000);
    id = setInterval(frame, 20);
    resetId = setInterval(reset, 200);
    // timeId = setInterval(timer, 1000);
    window.addEventListener("keydown", function (e) {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowLeft" ||
        e.key === "r" ||
        e.key === "R" ||
        e.key === " "
      ) {
        if (started == true) {
          keypress = e.key;
          e.view.event.preventDefault();
        } else {
          keypress = "";
        }
      }
    });

    header.append("GAME START");
    myTime.append("Time remaining: " + time + "s");
    speedVal.innerHTML = "Speed: " + currspd;
    if (getScore() == 0) {
      highScore.append("Latest remaining time: ");
    } else {
      highScore.append("Latest remaining time: " + getScore() + "s");
    }
  },
  stop: function () {
    keypress = "";
    clearInterval(id);
    clearInterval(timeId);
    reset();
  }
};

function reset() {
  if (keypress === "r") {
    count = 0;
    ex = 5;
    ey = 5;
    currspd = spd1;
    time = 20;
    elem.style.top = ey + "px";
    elem.style.left = ex + "px";
    keypress = "";
    mvmt = "";
    started = false;
    clearInterval(id);
    id = setInterval(frame, 20);
    clearInterval(resetId);
    resetId = setInterval(reset, 200);
    clearInterval(timeId);
    header.innerHTML = "GAME START";
    myTime.innerHTML = "Time remaining: " + time + "s";
    speedVal.innerHTML = "Speed: " + currspd;
  }
}

function resetClicked() {
    count = 0;
    ex = 5;
    ey = 5;
    currspd = spd1;
    time = 20;
    elem.style.top = ey + "px";
    elem.style.left = ex + "px";
    keypress = "";
    mvmt = "";
    started = false;
    clearInterval(id);
    id = setInterval(frame, 20);
    clearInterval(resetId);
    resetId = setInterval(reset, 200);
    clearInterval(timeId);
    header.innerHTML = "GAME START";
    myTime.innerHTML = "Time remaining: " + time + "s";
    speedVal.innerHTML = "Speed: " + currspd;
}

function frame() {
  for (i = 0; i < obstacles.length; i++) {
    switch (keypress) {
      case "ArrowRight":
        saveKeypress();
        if (crash(obstacles[i]) || ex >= 650) {
          loseMessage();
        } else {
          ex += currspd;
          elem.style.left = ex + "px";
        }
        break;
      case "ArrowLeft":
        saveKeypress();
        if (crash(obstacles[i]) || ex <= 0) {
          loseMessage();
        } else {
          ex -= currspd;
          elem.style.left = ex + "px";
        }
        break;
      case "ArrowDown":
        saveKeypress();
        if (crash(obstacles[i]) || ey >= 450) {
          loseMessage();
        } else {
          ey += currspd;
          elem.style.top = ey + "px";
        }
        break;
      case "ArrowUp":
        saveKeypress();
        if (crash(obstacles[i]) || ey <= 0) {
          loseMessage();
        } else {
          ey -= currspd;
          elem.style.top = ey + "px";
        }
        break;
      case " ":
        keypress = getKeypress();
        if (currspd == spd1) {
          currspd = spd2;
          changeSpeed();
        } else if (currspd == spd2) {
          currspd = spd3;
          changeSpeed();
        } else if (currspd == spd3) {
          currspd = spd1;
          changeSpeed();
        }
        break;
    }
  }

  //Win the game
  if (crash(winTile)) {
    saveScore();
    header.innerHTML = "GOODJOB! YOU GTFO!";
    highScore.append(" (WON)");
    gameArea.stop();
  } else if (time <= 0.5) {
    loseMessage();
  }
}

//Lose the game
function loseMessage() {
  console.log("CRASHED!");
  saveScore();
  header.innerHTML = "OOPS YOU GOT CAUGHT, TIME TO OT!";
  highScore.append(" (LOST)");
  gameArea.stop();
}

function saveScore() {
  clearInterval(timeId);
  sessionStorage.setItem("time", time);
  highScore.innerHTML =
    "Your latest remaining time is: " + Math.round(getScore()) + "s";
}

function getScore() {
  var latestScore = Math.round(sessionStorage.getItem("time"));
  return latestScore;
}

function saveKeypress() {
  sessionStorage.setItem("key", keypress);
}

function getKeypress() {
  keypress = sessionStorage.getItem("key");
  console.log(keypress);
  return keypress;
}

window.addEventListener("keydown", function (e) {
  if (e.key === "c" || e.key === "C") {
    if (started == false) {
      started = true;
      timeId = setInterval(timer, 1000);
      if (time == 20) {
        keypress = "ArrowRight";
      }
    } else {
      keypress = getKeypress();
    }
  }
});

function startTimer() {
  if (started == false) {
    timeId = setInterval(timer, 1000);
    started = true;
    if (time == 20) {
      keypress = "ArrowRight";
    }
  } else {
    keypress = getKeypress();
  }
}

function timer() {
  if (time <= 0) {
    clearInterval(timeId);
    gameArea.stop();
  } else {
    time -= 1;
    myTime.innerHTML = "Time remaining: " + Math.round(time) + "s";
  }
}

function crash(otherobj) {
  var myleft = ex;
  var myright = ex + 50;
  var mytop = ey;
  var mybottom = ey + 50;
  // console.log("My left:" + myleft);
  var otherleft = otherobj.offsetLeft;
  var otherright = otherobj.offsetLeft + otherobj.clientWidth;
  var othertop = otherobj.offsetTop;
  var otherbottom = otherobj.offsetTop + otherobj.clientHeight;
  // console.log("Other right:" + otherright);

  var crash = true;
  if (
    mybottom < othertop ||
    mytop > otherbottom ||
    myright < otherleft ||
    myleft > otherright
  ) {
    crash = false;
  }
  return crash;
}

function changeSpeed() {
  console.log("Speed changed! Current speed is: " + currspd);
  speedVal.innerHTML = "Speed: " + currspd;
}

// function myMove() {
//   elem.classList.add("spin");
// }

// elem.addEventListener("animationend", () => {
//   elem.classList.remove("spin");
// });
