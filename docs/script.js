var header = document.getElementById("startHeader");
var myScore = document.getElementById("myTime");
var time = 20;
var highScore = document.getElementById("highScore");
var id = null;
var resetId = null;
var ex = 5;
var ey = 5;
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
    clearInterval(id);
    clearInterval(resetId);
    id = setInterval(frame, 20);
    resetId = setInterval(reset, 200);
    window.addEventListener("keydown", function (e) {
      keypress = e.key;
      // console.log(keypress);
    });
    header.append("GAME START");
    myTime.append("Time remaining: " + time + "s");
    if (getScore() == 0) {
      highScore.append("Latest remaining time: ");
    } else {
      highScore.append("Latest remaining time: " + getScore() + "s");
    }
  },
  stop: function () {
    keypress = "";
    clearInterval(id);
    header.innerHTML = "GAME OVER";
    reset();
  }
};

function reset() {
  if (keypress == "r") {
    count = 0;
    ex = 5;
    ey = 5;
    time = 20;
    elem.style.top = ey + "px";
    elem.style.left = ex + "px";
    keypress = "";
    mvmt = "";
    clearInterval(id);
    id = setInterval(frame, 20);
    clearInterval(resetId);
    resetId = setInterval(reset, 200);
    header.innerHTML = "GAME START";
    myTime.innerHTML = "Time remaining: " + time + "s";
    highScore.innerHTML = "Latest remaining time: " + getScore() + "s";
  }
}

function frame() {
  // console.log(score);
  for (i = 0; i < obstacles.length; i++) {
    switch (keypress) {
      case "ArrowRight":
        if (crash(obstacles[i]) || ex >= 650) {
          loseMessage();
        } else {
          // console.log(ex);
          ex += 0.3;
          elem.style.left = ex + "px";
          time -= 0.0025;
          myTime.innerHTML = "Time remaining: " + Math.round(time) + "s";
        }
        break;
      case "ArrowLeft":
        if (crash(obstacles[i]) || ex <= 0) {
          loseMessage();
        } else {
          ex -= 0.3;
          elem.style.left = ex + "px";
          time -= 0.0025;
          myTime.innerHTML = "Time remaining: " + Math.round(time) + "s";
        }
        break;
      case "ArrowDown":
        if (crash(obstacles[i]) || ey >= 450) {
          loseMessage();
        } else {
          ey += 0.3;
          elem.style.top = ey + "px";
          time -= 0.0025;
          myTime.innerHTML = "Time remaining: " + Math.round(time) + "s";
        }
        break;
      case "ArrowUp":
        if (crash(obstacles[i]) || ey <= 0) {
          loseMessage();
        } else {
          ey -= 0.3;
          elem.style.top = ey + "px";
          time -= 0.0025;
          myTime.innerHTML = "Time remaining: " + Math.round(time) + "s";
        }
        break;
    }

    // console.log(ex);
    // if (crash(obstacles[i]) || ex >= 650 || ex <= 0 || ey >= 450 || ey <= 0) {
    //   loseMessage();
    // }
  }

  //Win the game
  if (crash(winTile)) {
    saveScore();
    gameArea.stop();
  } else if (time <= 0.5) {
    loseMessage();
  }
}

//Lose the game
function loseMessage() {
  console.log("CRASHED!");
  highScore.innerHTML =
    "You lost! Your latest remaining time is: " + Math.round(getScore()) + "s";
  gameArea.stop();
}

function saveScore() {
  sessionStorage.setItem("time", time);

  highScore.innerHTML =
    "You win! Your latest remaining time is: " + Math.round(getScore()) + "s";
}

function getScore() {
  var latestScore = Math.round(sessionStorage.getItem("time"));
  return latestScore;
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

// function myMove() {
//   elem.classList.add("spin");
// }

// elem.addEventListener("animationend", () => {
//   elem.classList.remove("spin");
// });
