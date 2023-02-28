const wins = document.getElementById("wins");
const choices = document.getElementById("choices");
const winner = document.getElementById("winner");
const infoText = document.getElementById("infoText");
const playerWinsCount = document.getElementById("playerWinsCount");
const robotWinsCount = document.getElementById("robotWinsCount");
const playerChoice = document.getElementById("playerChoice");
const robotChoice = document.getElementById("robotChoice");
const roundText = document.getElementById("round");

wins.style.display = "none";
choices.style.display = "none";
winner.style.display = "none";
roundText.style.display = "none";

class Game {
  constructor() {
    this.options = ["Rock", "Paper", "Scissors"];
    this.playerOption = "";
    this.playerWin = 0;
    this.robotWin = 0;
    this.round = 5;
    this.sessionEndTime = 5;
  }

  updateGame(playerChoiceIndex) {
    this.round--;
    if (this.round >= 0) {
      playerChoice.innerHTML = this.options[playerChoiceIndex];
      const thisRobotChoice = this.getRobotChoice();
      robotChoice.innerHTML = thisRobotChoice.name;
      roundText.innerHTML = `Round: ${this.round}`;
      this.checkRoundWinner(playerChoiceIndex, thisRobotChoice.index);

      wins.style.display = "flex";
      choices.style.display = "flex";
      winner.style.display = "flex";
      roundText.style.display = "flex";
      infoText.style.display = "none";

      if (this.round === 0) {
        this.endGame();
      }
    }
  }

  endGame() {
    if (this.playerWin > this.robotWin) {
      winner.innerHTML = "WINNER: PLAYER";
    } else if (this.playerWin === this.robotWin) {
      winner.innerHTML = "WINNER: DRAW";
    } else {
      winner.innerHTML = "WINNER: TRINIDA";
    }
    this.endSession();
  }

  endSession() {
    let counter = 10;
    const intervalId = setInterval(() => {
      roundText.innerHTML = `Session ends ${counter} seconds later`;
      if (counter === 0) {
        clearInterval(intervalId);
        wins.style.display = "none";
        choices.style.display = "none";
        winner.style.display = "none";
        roundText.style.display = "none";
        infoText.style.display = "flex";
        this.playerOption = "";
        this.playerWin = 0;
        this.robotWin = 0;
        this.round = 5;
        this.sessionEndTime = 5;
      }
      counter--;
    }, 1000);
  }

  getRobotChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    return { name: this.options[randomNumber], index: randomNumber };
  }

  checkRoundWinner(playerChoiceIndex, robotChoiceIndex) {
    if (playerChoiceIndex === robotChoiceIndex) {
      winner.innerHTML = "Draw";
      playerWinsCount.innerHTML = this.playerWin;
      robotWinsCount.innerHTML = this.robotWin;
    } else if (
      (playerChoiceIndex === 0 && robotChoiceIndex === 2) ||
      (playerChoiceIndex === 1 && robotChoiceIndex === 0) ||
      (playerChoiceIndex === 2 && robotChoiceIndex === 1)
    ) {
      this.playerWin++;

      playerWinsCount.innerHTML = this.playerWin;
      robotWinsCount.innerHTML = this.robotWin;
      winner.innerHTML = "Round Winner: Player";
    } else {
      this.robotWin++;
      playerWinsCount.innerHTML = this.playerWin;
      robotWinsCount.innerHTML = this.robotWin;
      winner.innerHTML = "Round Winner: Trinida";
    }
  }
}

const newGame = new Game();
const startGame = (index) => {
  newGame.updateGame(index);
};
