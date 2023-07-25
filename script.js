// Controls the flow of the game
const gameControl = (() => {
    let playerTurn = 0;
    let winner = null;
    let gameover = false;

    const getGameStatus = () => {
        return !gameover;
    }

    const getPlayerSymbol = () => {
        return playerTurn === 0 ? 'O' : 'X';
    }

    const nextPlayerTurn = () => {
        playerTurn = playerTurn === 0 ? 1 : 0;
    }

    const configureWinner = (winningSymbol) => {
        winner = winningSymbol === 'O' ? 'Player 1' : 'Player 2';
        gameover = true;
    }

    const confirmWinningLine = (tileArray) => {
        if ((tileArray[0] !== '') && (tileArray[0] === tileArray[1]) && (tileArray[0] === tileArray[2])) {
            configureWinner(tileArray[0]);
            console.log('winner!');
        }
    }

    const checkForWinner = (tiles) => {
        // Gets and checks for the rows
        for (let index = 0; index < 3; index++) {
            let row = [
                tiles[0 + (index * 3)], 
                tiles[1 + (index * 3)], 
                tiles[2 + (index * 3)]
            ];
            confirmWinningLine(row);
        }

        // Gets and checks for the columns
        for (let index = 0; index < 3; index++) {
            let col = [
                tiles[0 + index], 
                tiles[3 + index], 
                tiles[6 + index]
            ];
            confirmWinningLine(col);
        }

        // Checks the diagnols
        if (tiles[4] !== '') {
            let diag1 = [
                tiles[0],
                tiles[4],
                tiles[8]
            ];

            let diag2 = [
                tiles[2],
                tiles[4],
                tiles[6]
            ];

            confirmWinningLine(diag1);
            confirmWinningLine(diag2);
        }

        if (!tiles.includes('') && gameControl.getGameStatus()) {
            console.log('Draw!');
        }

        if (gameControl.getGameStatus()) {
            nextPlayerTurn();
        }
    }

    return { getPlayerSymbol, checkForWinner, getGameStatus }
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
            if (tile.textContent === '' && gameControl.getGameStatus()) {
                const playerSymbol = gameControl.getPlayerSymbol();;
                tile.textContent = playerSymbol;
                tile.classList.add(`symbol-${playerSymbol.toLowerCase()}`);
                tiles[tileId] = playerSymbol;
                gameControl.checkForWinner(tiles);
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