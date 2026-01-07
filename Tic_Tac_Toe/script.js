const boxes = document.querySelectorAll(".box");
const statusText = document.getElementById("status");
const overlay = document.querySelector(".overlay");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart")
const clickSound = new Audio("sounds/click.wav");
const winSound = new Audio("sounds/win.wav");

let isAImode = false;
let turnX = true;
let gameOver = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

document.getElementById("onePlayer").onclick = () => {
  isAImode = true;
};

document.getElementById("twoPlayer").onclick = () => {
  isAImode = false;
};

boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || gameOver || (isAImode && !turnX)) return;
    clickSound.currentTime = 0;
    clickSound.play();
    if(turnX){
      box.innerText = "X";
      box.classList.add("x");
    }else {
      box.innerText = "O";
      box.classList.add("o");
    }
    checkWinner();
    if(!gameOver){
        turnX = !turnX;
        statusText.innerText = turnX ? "Player X turn" : "Player O turn";
        if (isAImode && !turnX) {
        setTimeout(aiMove, 400);
      }   
    }
  });
});

function aiMove() {
  let emptyBoxes = [];

  boxes.forEach((box, index) => {
    if (box.innerText === "") {
      emptyBoxes.push(index);
    }
  });

  if (emptyBoxes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
  const move = emptyBoxes[randomIndex];

  boxes[move].innerText = "O";
  boxes[move].classList.add("o");

  checkWinner();
  if (!gameOver) {
    turnX = true;
    statusText.innerText = "Player X turn";
  }
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[a].innerText === boxes[c].innerText
    ) {
      winSound.currentTime = 0;
      winSound.play();
      showResult(`Winner is ${boxes[a].innerText}`);
      gameOver = true;
      return;
    }
  }

  const isDraw = [...boxes].every(box => box.innerText !== "");
  if (isDraw) {
    showResult("It's a Draw");
    gameOver = true;
  }
}
function showResult(message){
  resultText.innerText = message;
  overlay.classList.remove("hidden");
}
restartBtn.addEventListener("click", () => {
  boxes.forEach(box => {
    box.innerText = "";
    box.classList.remove("x", "o");
  });
  turnX = true;
  gameOver = false;
  overlay.classList.add("hidden");
  statusText.innerText = "Player X turn";
});
