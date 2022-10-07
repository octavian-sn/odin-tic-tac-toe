const player = (playerTag) => {
    const playerInput = document.getElementById(`${playerTag}`);
    let name = () =>`Player ${playerTag}`;
    let symbol = playerTag;
    let score = 0;
    return {symbol, name, score};
};

const board = (() => {
    let squares = Array.from(document.querySelectorAll('.square'));
    let choices = ['', '', '', '', '', '', '', '', '',];

    const newBoard = function() {
        for (i = 0; i < 9; i++) {
            choices[i] = '';
            squares[i].innerHTML = '';
        }
    }

    squares.forEach(square => {
        square.addEventListener('click', function() {
            if (this.innerHTML == '') {
                if (game.turnOf === 'X') {
                    this.innerHTML = PlayerX.symbol;
                    game.turnOf = 'O';
                    choices[squares.indexOf(this)] = this.innerHTML;
                    ++PlayerX.score;
                    PlayerX.score >= 3 ? game.checkWinner() : '';
                } else {
                    this.innerHTML = PlayerO.symbol;
                    game.turnOf = 'X';
                    choices[squares.indexOf(this)] = this.innerHTML;
                    ++PlayerO.score;
                    PlayerO.score >= 3 ? game.checkWinner() : '';
                }
            } else {alert('Taken!')};
        })
    })
    
    return {squares, choices, newBoard};
})();

const game = (() => {
    let turnOf = 'X';
    let message = `The winner is: Player${turnOf}`;
    const button = document.getElementById('new-game');
    button.addEventListener('click', () => {
        board.newBoard()
        PlayerX.score = 0;
        PlayerO.score = 0;
        game.turnOf = 'X';
    });
    

    const checkWinner = () => {
        // Horizontal rows
        if (board.choices[0] === board.choices[1] && board.choices[1] === board.choices[2] &&
            board.choices[2] !== '') {
            alert(message);
        } else if (board.choices[3] === board.choices[4] && board.choices[4] === board.choices[5] &&
            board.choices[5] !== ''){
            alert(message);
        } else if (board.choices[6] === board.choices[7] && board.choices[7] === board.choices[8] &&
            board.choices[8] !== ''){
            alert(message);
        }
        // Vertical rows
          else if (board.choices[0] === board.choices[3] && board.choices[3] === board.choices[6] &&
            board.choices[6] !== ''){
            alert(message);
        } else if (board.choices[1] === board.choices[4] && board.choices[4] === board.choices[7] &&
            board.choices[7] !== ''){
            alert(message);
        } else if (board.choices[2] === board.choices[5] && board.choices[5] === board.choices[8] &&
            board.choices[8] !== ''){
            alert(message);
        }
        // Diagonal rows
          else if (board.choices[0] === board.choices[4] && board.choices[4] === board.choices[8] &&
            board.choices[8] !== ''){
            alert(message);
        } else if (board.choices[2] === board.choices[4] && board.choices[4] === board.choices[6] &&
            board.choices[6] !== ''){
            alert(message);
        } 
        // Tie
          else if (PlayerX.score === 5 && PlayerO.score === 4) {
            alert('Tie');
        } else if (PlayerX.score === 4 && PlayerO.score === 5) {
            alert('Tie');
        }
    }

    return {turnOf, checkWinner};
})();

let PlayerX = player('X');
let PlayerO = player('O');