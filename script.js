const playerConstruct = (playerTag) => {
    const playerInput = document.getElementById(`${playerTag}`);
    const name = () =>`Player ${playerTag}`;
    let symbol = playerTag;
    return {symbol, name};
};

let PlayerX = playerConstruct('X');
let Player0 = playerConstruct('O');

const gameBoard = (() => {
    const squares = Array.from(document.querySelectorAll('.square'));
    const choices = ['', '', '', '', '', '', '', '', ''];

    squares.forEach(square => {
        square.addEventListener('click', function() {
            if (this.innerHTML == '') {
                if (game.turnOf === 'X') {
                    this.innerHTML = PlayerX.symbol;
                    game.turnOf = 'O';
                    choices[squares.indexOf(this)] = this.innerHTML;
                    game.test();
                } else {
                    this.innerHTML = Player0.symbol;
                    game.turnOf = 'X';
                    choices[squares.indexOf(this)] = this.innerHTML;
                }
            } else {alert('Taken!')};
        })
    })

    return {squares, choices};
})();

const game = (() => {
    let turnOf = 'X';

    // const gameStatus = () => {
    // }

    
    return {turnOf};
})();
