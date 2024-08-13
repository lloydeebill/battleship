class Gameplay {
  constructor(playerBoardState, enemyBoardState) {
    this.playerBoardState = playerBoardState;
    this.enemyBoardState = enemyBoardState;
    this.initializeGamePlay();
  }

  initializeGamePlay() {
    this.populateBoards();
  }

  populateBoards() {
    const playerBoard = document.querySelector(".player-board");

    this.playerBoardState.forEach((cell) => {
      console.log(`${cell}`);
    });
  }
}

export { Gameplay };
