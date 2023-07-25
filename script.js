// Controls the flow of the game
const gameControl = (() => {
    let playerTurn = 0;

    const getPlayerSymbol = () => {
        return playerTurn === 0 ? 'O' : 'X';
    }

    const nextPlayerTurn = () => {
        playerTurn = playerTurn === 0 ? 1 : 0;
    }

    return { getPlayerSymbol, nextPlayerTurn }
})();

// Controls the board display
const gameBoard = (() => {
    const gameBoardEl = document.getElementById('gameboard');
    const tiles = [];

    const createTile = (tileId) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        addTileListener(tile, tileId);
        gameBoardEl.appendChild(tile);
        tiles.push('');
    }

    const addTileListener = (tile, tileId) => {
        tile.addEventListener('click', () => {
            if (tile.textContent === '') {
                const playerSymbol = gameControl.getPlayerSymbol();;
                tile.textContent = playerSymbol;
                tiles[tileId] = playerSymbol;
                gameControl.nextPlayerTurn();
            }
        });
    }

    const generateTiles = () => {
        for (let index = 0; index < 9; index++) {
            createTile(index);
        }
    }
    
    const initializeBoard = () => {
        generateTiles();
    }

    return { initializeBoard }
})();

const player = () => {

}

gameBoard.initializeBoard();