// Controls the flow of the game
const gameControl = (() => {
    let playerTurn = 0;

    const getPlayerTurn = () => {
        return playerTurn;
    }

    const nextPlayerTurn = () => {
        playerTurn = playerTurn === 0 ? 1 : 0;
    }

    return { getPlayerTurn, nextPlayerTurn }
})();

const gameBoard = (() => {
    const gameBoardEl = document.getElementById('gameboard');

    const generateTiles = () => {
        for (let index = 0; index < 9; index++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            gameBoardEl.appendChild(tile);
        }
    }
    
    const initializeBoard = () => {
        generateTiles();
    }

    return { initializeBoard };

})();

const player = () => {

}

gameBoard.initializeBoard();