const player = (playerTag) => {
    const input = document.getElementById(`${playerTag}`);
    let name = `Player ${playerTag}`;
    let symbol = playerTag;
    let score = 0;
    return {symbol, name, score, input};
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
                    choices[squares.indexOf(this)] = this.innerHTML;
                    ++PlayerX.score;
                    PlayerX.score >= 3 ? game.checkWinner(PlayerX.name) : '';
                    game.turnOf = 'O';
                } else {
                    this.innerHTML = PlayerO.symbol;
                    game.turnOf = 'X';
                    ++PlayerO.score;
                    choices[squares.indexOf(this)] = this.innerHTML;
                    PlayerO.score >= 3 ? game.checkWinner(PlayerO.name) : '';
                }
            } else {alert('Taken!')};
        })
    })
    
    return {squares, choices, newBoard};
})();

let PlayerX = player('X');
let PlayerO = player('O');

const game = (() => {
    // Player turn counter
    let turnOf = 'X';
    let winner = '';

    // New game
    const newGame = () => {
        board.newBoard()
        PlayerX.score = 0;
        PlayerO.score = 0;
        game.turnOf = 'X';
    };

    // Change names of players
    PlayerX.input.addEventListener('input', function(){
        PlayerX.name = this.value;
        if (PlayerX.name == '') {PlayerX.name = 'PlayerX'};
    });
    PlayerO.input.addEventListener('input', function(){
        PlayerO.name = this.value;
        if (PlayerO.name == '') {PlayerO.name = 'PlayerO'};
    });

    const checkWinner = (name) => {
        // Horizontal rows
        if (board.choices[0] === board.choices[1] && board.choices[1] === board.choices[2] &&
            board.choices[2] !== '') {
            game.winner = `The winner is: ${name}`;
            modal.open();
        } else if (board.choices[3] === board.choices[4] && board.choices[4] === board.choices[5] &&
            board.choices[5] !== ''){
            game.winner = `The winner is: ${name}`;
            modal.open();
        } else if (board.choices[6] === board.choices[7] && board.choices[7] === board.choices[8] &&
            board.choices[8] !== ''){
            game.winner = `The winner is: ${name}`;
            modal.open();
        }
        // Vertical rows
          else if (board.choices[0] === board.choices[3] && board.choices[3] === board.choices[6] &&
            board.choices[6] !== ''){
            game.winner = `The winner is: ${name}`;
            modal.open();
        } else if (board.choices[1] === board.choices[4] && board.choices[4] === board.choices[7] &&
            board.choices[7] !== ''){
            game.winner = `The winner is: ${name}`;
            modal.open();
        } else if (board.choices[2] === board.choices[5] && board.choices[5] === board.choices[8] &&
            board.choices[8] !== ''){
            game.winner = `The winner is: ${name}`;
            modal.open();
        }
        // Diagonal rows
          else if (board.choices[0] === board.choices[4] && board.choices[4] === board.choices[8] &&
            board.choices[8] !== ''){
            game.winner = `The winner is: ${name}`;
            modal.open();
        } else if (board.choices[2] === board.choices[4] && board.choices[4] === board.choices[6] &&
            board.choices[6] !== ''){
            game.winner = `The winner is: ${name}`;
            modal.open();
        } 
        // Tie
          else if (PlayerX.score === 5 && PlayerO.score === 4) {
            game.winner = `It's a tie!`;
            modal.open();
        } else if (PlayerX.score === 4 && PlayerO.score === 5) {
            game.winner = `It's a tie!`;
            modal.open();
        }
    }

    return {turnOf, checkWinner, newGame, winner};
})();

const modal = (() => {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal__window');
    const overlay = document.getElementById('overlay');
    const restart = document.getElementById('restart'); 
    const button = document.getElementById('modal__button');
    button.addEventListener('click', () => {
        game.newGame();
        close();
    });
    overlay.addEventListener('click', close);
    restart.addEventListener('click', () => {game.newGame()});

    // Open pop-up
    function open() {
        console.log(game.winner);
        modalMessage.innerHTML = game.winner;
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
    }
    // Close pop-up
    function close() {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }

    return {button, open};
})()