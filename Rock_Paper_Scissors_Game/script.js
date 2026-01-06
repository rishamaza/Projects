// 🔊 Sounds
const winSound   = new Audio("sounds/win.mp3");
const loseSound  = new Audio("sounds/lose.mp3");
const drawSound  = new Audio("sounds/draw.mp3");


let userScore=0;
let compScore=0;
const choices=document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return options[randomIndex];
};
const drawGame = () => {
  drawSound.currentTime = 0;
  drawSound.play();
  msg.innerText = "Game was Draw. Play again!";
  msg.style.backgroundColor = "#fb0660ff";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    winSound.currentTime = 0;
    winSound.play();
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    // msg.style.backgroundColor = "green";
  } else {
    loseSound.currentTime = 0;
    loseSound.play();
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    // msg.style.backgroundColor = "red";
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();
  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});