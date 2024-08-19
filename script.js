let boxes = Array.from(document.getElementsByClassName("boxes"));

let playermsg = document.getElementsByClassName("playermsg");
let winname = document.getElementById("winnername");

let restartbtn = document.querySelector(".restart");

let checkarr = Array(9).fill(null);

let count = 1;

const xplayer = "X";
const oplayer = "O";
let currplayer = xplayer;

function playgame() {
  for (const box of boxes) {
    box.addEventListener("click", boxclicked);
  }
}

function boxclicked(e) {
  const getid = e.target.id;

  if (checkarr[getid] === null) {
    checkarr[getid] = currplayer;
    e.target.innerText = currplayer;

    if (playerwon() !== false) {
      winname.style.display = "block";
      winname.innerText = `The winner is ${currplayer}`;

      winarr = playerwon();
      console.log(winarr);

      for (const arr of winarr) {
        boxes[arr].style.backgroundColor = "#2d414b";
      }

      disablebtn();
      return;
    }
    count++;
    if (count == 10) {
      winname.style.display = "block";
      winname.innerText = "DRAW GAME";
    }
    currplayer = currplayer == oplayer ? xplayer : oplayer;
  }
}
const wincombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerwon() {
  for (const element of wincombo) {
    let [a, b, c] = element;

    if (
      checkarr[a] !== null &&
      checkarr[a] === checkarr[b] &&
      checkarr[b] === checkarr[c]
    ) {
      return [a, b, c];
    }
  }
  return false;
}

function disablebtn() {
  for (const box of boxes) {
    box.removeEventListener("click", boxclicked);
  }
}

function enablebtn() {
  for (const box of boxes) {
    box.addEventListener("click", boxclicked);
  }
}

restartbtn.addEventListener("click", restartgame);

function restartgame() {
  for (const box of boxes) {
    box.innerText = "";
    box.style.backgroundColor = null;
  }
  checkarr.fill(null);
  winname.style.display = "";

  currplayer = xplayer;
  count = 1;
  enablebtn();
}

playgame();
