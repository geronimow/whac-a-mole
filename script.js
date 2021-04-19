var gameboard = document.querySelector('#gameboard');
var block;
var rand;
var score = 0;
var boardSize;
var turnTimer;
var generalTimer;
var previousRand = 'hkljhgf';
var time = 10;

document.querySelector('.startGame').addEventListener('click', () => {
    generalTimer = setInterval(endgame, 1000);
    document.querySelector('.preferences').classList.add('none');
    document.querySelector('.gameboard').classList.remove('none');
    boardSize = document.querySelector('#boardSize').value;
    for (let i = 1; i <= boardSize; i++) {
        div = document.createElement('div');
        div.dataset.id = i;
        div.classList.add('block');
        gameboard.append(div);
    }
    document.querySelectorAll('.block').forEach(block => {
        size = 100/Math.sqrt(boardSize); 
        block.style.height = size + '%';
        block.style.width = size + '%';
    });
    nextTurn();
})

gameboard.addEventListener('click', (el) => {
    el = el.target;
    // el.classList.contains('image')
    // el == block
    // el.dataset.id == rand
    if (el.dataset.id == rand) {
        score++;
    } else {
        score--;
    }
    nextTurn();
})

function nextTurn() {
    document.querySelector('#score').innerHTML = score;
    clearInterval(turnTimer);
    turnTimer = setInterval(endTurnTimer, 3000);
    if (block) {
        block.classList.remove('image');
    }
    rand = Math.floor(Math.random()*boardSize) + 1;
    // Pour éviter d'avoir 2 fois la même case d'affilé
    // while (rand == previousRand) {
    //     rand = Math.floor(Math.random()*boardSize) + 1;
    // }
    // previousRand = rand;
    block = document.querySelector(`[data-id="${rand}"]`);
    block.classList.add('image');
}

function endTurnTimer() {
    score--;
    nextTurn();
}

function endgame() {
    time--;
    document.querySelector('#time').innerHTML = time;
    if (time == 0) {
        clearInterval(generalTimer);
        clearInterval(turnTimer);
        document.querySelector('#points').innerHTML = score;
        document.querySelector('.gameboard').classList.add('none');
        document.querySelector('.results').classList.remove('none');
    }
}