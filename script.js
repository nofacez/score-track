const playerLeft = document.querySelector(".player_left");
const playerRight = document.querySelector(".player_right");

const playerLeftScore = document.querySelector(".score__player-left");
const playerRightScore = document.querySelector(".score__player-right");

const btnReset = document.querySelector(".score__btn-reset");
const btnUndo = document.querySelector(".score__btn-undo");

let scoreLeft = 0;
let scoreRight = 0;

btnReset.addEventListener("click", () => {
  scoreLeft = 0;
  scoreRight = 0;
  playerLeftScore.textContent = scoreLeft;
  playerRightScore.textContent = scoreRight;
});

/**
 * @param {'left' | 'right'} player
 */
const addScoreToPlayer = (player) => {
  if (player === "left") {
    scoreLeft++;
    playerLeftScore.textContent = scoreLeft;
    return;
  }
  if (player === "right") {
    scoreRight++;
    playerRightScore.textContent = scoreRight;
    return;
  }
};

// Desktop double click
playerLeft.addEventListener("dblclick", () => {
  addScoreToPlayer("left", 1);
});

playerRight.addEventListener("dblclick", () => {
  addScoreToPlayer("right", 1);
});

// Mobile double tap
/* Regex test to determine if user is on mobile */
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  playerLeft.addEventListener("touchend", doubleTapToAddScore("left"), {
    passive: false,
  });
  playerRight.addEventListener("touchend", doubleTapToAddScore("right"), {
    passive: false,
  });
}

/* Based on this http://jsfiddle.net/brettwp/J4djY/*/
function doubleTapToAddScore(player) {
  let lastTap = 0;
  let timeout;
  return function detectDoubleTap(event) {
    const curTime = new Date().getTime();
    const tapLen = curTime - lastTap;
    if (tapLen < 500 && tapLen > 0) {
      addScoreToPlayer(player);
      event.preventDefault();
    } else {
      timeout = setTimeout(() => {
        clearTimeout(timeout);
      }, 500);
    }
    lastTap = curTime;
  };
}
