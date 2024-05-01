const TEAM2 = {
    BLACK: {
        NAME: 'BLACK',
        CLASS_NAME: 'black-player',
        HIGHLIGHT_CLASS_NAME: 'black-name',
        ENNEMY_NAME: 'WHITE'
    },
    WHITE: {
        NAME: 'WHITE',
        CLASS_NAME: 'white-player',
        HIGHLIGHT_CLASS_NAME: 'white-name',
        ENNEMY_NAME: 'BLACK'
    }
};

let scores = {
    [TEAM2.BLACK.NAME]: 0,
    [TEAM2.WHITE.NAME]: 0
};

let current_team;
let potential_destinations = [];

let squares = Array(8).fill().map(() => Array(8).fill())

let board_game = document.getElementById('board_game');
let cancel_btn = document.getElementById('cancel-btn');

cancel_btn.classList.add('invisible');
cancel_btn.onclick = () => hide_moves();


board_game.onclick = (e) => {
    if (!e.target.classList.contains('current-team') &&
        !(potential_destinations.includes(e.target)))
        document.getElementById('wrong-move').classList.remove('invisible');

    if (!e.target.classList.contains('clicked'))
        hide_moves();
}

const init_board = () => {
    let row = 0;
    let column = 0;

    for (const square of board_game.children) {
        
        if (square.classList.contains('clear-float'))
            continue;

        
        if ((row % 2 === 0 && column % 2 === 0) || (row % 2 !== 0 && column % 2 !== 0)) {
            player = document.createElement('div');
            player.classList.add('player');

            if (row <= 2)
                player.classList.add(TEAM2.BLACK.CLASS_NAME);
            else if (row >= 5)
                player.classList.add(TEAM2.WHITE.CLASS_NAME);
            else
                player.classList.add('invisible');

            square.appendChild(player);
        }

        
        square.setAttribute('id', `${row}${column}`);

        squares[row][column] = square;

        if (column === 7) {
            column = 0;
            row++;
        } else {
            column++;
        }
    }
};

const get_potential_destinations = (row, column, current_team) => {
    
    if (current_team === TEAM2.BLACK.NAME) {
        
        if (row < 7 && column > 0) {
            let destination = squares[row + 1][column - 1];

            if (destination.children[0].classList.contains('invisible'))
                potential_destinations.push(destination);

            
            else if ((destination.children[0].classList.contains(TEAM2.WHITE.CLASS_NAME))) {
                if (row + 1 < 7 && column - 1 > 0) {
                    destination = squares[row + 2][column - 2];
                    if (destination.children[0].classList.contains('invisible'))
                        potential_destinations.push(destination);
                }
            }
        }

        
        if (row < 7 && column < 7) {
            let destination = squares[row + 1][column + 1];

            if (destination.children[0].classList.contains('invisible'))
                potential_destinations.push(destination);

            else if ((destination.children[0].classList.contains(TEAM2.WHITE.CLASS_NAME))) {
                if (row + 1 < 7 && column + 1 < 7) {
                    destination = squares[row + 2][column + 2];
                    if (destination.children[0].classList.contains('invisible'))
                        potential_destinations.push(destination);
                }
            }
        }
    }

    
    else {
       
        if (row > 0 && column > 0) {
            let destination = squares[row - 1][column - 1];

            if (destination.children[0].classList.contains('invisible'))
                potential_destinations.push(destination);

            
            else if ((destination.children[0].classList.contains(TEAM2.BLACK.CLASS_NAME))) {
                if (row - 1 > 0 && column - 1 > 0) {
                    destination = squares[row - 2][column - 2];
                    if (destination.children[0].classList.contains('invisible'))
                        potential_destinations.push(destination);
                }
            }
        }

        
        if (row > 0 && column < 7) {
            let destination = squares[row - 1][column + 1];

            if (destination.children[0].classList.contains('invisible'))
                potential_destinations.push(destination);

            
            else if ((destination.children[0].classList.contains(TEAM2.BLACK.CLASS_NAME))) {
                if (row - 1 > 0 && column + 1 < 7) {
                    destination = squares[row - 2][column + 2];
                    if (destination.children[0].classList.contains('invisible'))
                        potential_destinations.push(destination);
                }
            }
        }
    }

    return potential_destinations;
}

const hide_moves = () => {
    potential_destinations.forEach(d => d.classList.remove('potential'));
    potential_destinations = [];

    let clickeds = document.getElementsByClassName('clicked');
    for (const clicked of clickeds) {
        clicked.classList.remove('clicked');
    }

}


const move_player_to_square = (player, square) => {
    let player_row = parseInt(player.parentElement.id[0]);
    let square_row = parseInt(square.id[0]);
    let is_eating = Math.abs(player_row - square_row) > 1;

    player.classList.remove(TEAM2[current_team].CLASS_NAME);
    player.classList.add('invisible');

    if (is_eating) {
        let victim_id = get_victim_id(player.parentElement.id, square.id);
        document.getElementById(victim_id).children[0].classList.add('invisible');

        scores[current_team]++;
    }

    square.children[0].classList.add(TEAM2[current_team].CLASS_NAME);
    square.children[0].classList.remove('invisible');
}

const main = () => {
    init_board();
    // set_current_player(TEAM2.BLACK.NAME);

}

main();

