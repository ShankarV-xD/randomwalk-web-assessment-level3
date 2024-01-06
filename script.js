//Storing references to DOM elements
let gameTitle = document.querySelector(".title");
// Added Dynamic Input Names
let playerNames = document.querySelector(".players");
let player1 = document.querySelector(".player-1");
let player2 = document.querySelector(".player-2");
let xScore = document.querySelector(".x-score");
let oScore = document.querySelector(".o-score");
let turnDisplay = document.querySelector(".turn");
let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

//Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

//Player 'X' plays first
let xTurn = true;
let count = 0;

//Variable declaration
let player1Name = "";
let player2Name = "";

//Initial Scores
let xCurrentScore = 0;
let oCurrentScore = 0;

//Update and Display the scores
const updateScores = () => {
  // Receiving value from the Input field
  // If no Names are entered the default value apllies using OR ||
  player1Name = `${player1.value}` || "Player X";
  player2Name = `${player2.value}` || "Player O";
  xScore.innerText = `${player1Name}'s Score: ${xCurrentScore}`;
  oScore.innerText = `${player2Name}'s Score: ${oCurrentScore}`;
};

//Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //disable title & scores
  //enable popup
  gameTitle.classList.add("hide");
  playerNames.classList.add("hide");
  xScore.classList.add("hide");
  oScore.classList.add("hide");
  popupRef.classList.remove("hide");
};

//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //enable title & scores
  //disable popup
  gameTitle.classList.remove("hide");
  playerNames.classList.remove("hide");
  xScore.classList.remove("hide");
  oScore.classList.remove("hide");
  popupRef.classList.add("hide");
};

//Function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  player1Name = `${player1.value}` || "Player X";
  player2Name = `${player2.value}` || "Player O";
  if (letter == "X") {
    msgRef.innerHTML = `&#x1F3C6; <br> '${player1Name}' Wins`;
    xCurrentScore += 1;
  } else {
    msgRef.innerHTML = `&#x1F3C6; <br> '${player2Name}' Wins`;
    oCurrentScore += 1;
  }
  updateScores();
};

//Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F91D; <br> It's a Draw";
  xTurn = true;
};

//New Game & Restart
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  updateScores();
  xTurn = true;
  turnDisplay.classList.add("hide");
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  updateScores();
  xTurn = true;
  turnDisplay.classList.add("hide");
});

//Win Logic
const winChecker = () => {
  //Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //Check if elements are filled and are same
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Display X
      element.innerText = "X";
      element.style.color = "#76453B";
      element.disabled = true;
    } else {
      xTurn = true;
      //Display Y
      element.innerText = "O";
      element.style.color = "#597E52";
      element.disabled = true;
    }

    player1Name = `${player1.value}` || "Player X";
    player2Name = `${player2.value}` || "Player O";

    //Turn indicator
    turnDisplay.classList.remove("hide");
    turnDisplay.innerText = xTurn
      ? `${player1Name}'s Turn [X]`
      : `${player2Name}'s Turn [O]`;

    //Increment count on each click
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //Check for win on every click
    winChecker();
  });
});

//Enable Buttons and disable popup on page load
window.onload = () => {
  enableButtons();
};
