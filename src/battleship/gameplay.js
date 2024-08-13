class Gameplay {
  constructor(playerBoardState, enemyBoardState) {
    this.playerBoardState = playerBoardState;
    this.enemyBoardState = enemyBoardState;
  }

  showBoardStates() {
    console.log(this.playerBoardState);
    console.log(this.enemyBoardState);
  }
}

export { Gameplay };
