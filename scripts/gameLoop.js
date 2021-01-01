const SQUARE_LENGTH = 25;
const GRID_WIDTH = (window.innerWidth / (SQUARE_LENGTH + 1)) | 0;
const GRID_HEIGHT = (window.innerHeight / (SQUARE_LENGTH + 1)) | 0;

let currentState = state(GRID_WIDTH, GRID_HEIGHT);
let time = 0;


const drawCell = (cell) => {
    fill(...cellColor(cell));
    rect(cell.pos[0] * SQUARE_LENGTH + cell.pos[0],
         cell.pos[1] * SQUARE_LENGTH + cell.pos[1],
         SQUARE_LENGTH,
         SQUARE_LENGTH);
};

const drawState = (state) => {
    R.flatten(state).forEach(cell => drawCell(cell));
};

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background(0);
    drawState(currentState);

    if (time % 200 === 0) {
        currentState = evolve(currentState);
    }

    mouseOnGrid();
    time = time + 1 % 201;
}

function mouseOnGrid() {
    R.filter(cell => cell.pos[0] * SQUARE_LENGTH + cell.pos[0] < mouseX
             && cell.pos[0] * SQUARE_LENGTH + cell.pos[0] + SQUARE_LENGTH > mouseX
             && cell.pos[1] * SQUARE_LENGTH + cell.pos[1] < mouseY
             && cell.pos[1] * SQUARE_LENGTH + cell.pos[1] + SQUARE_LENGTH > mouseY,
             currentState).forEach(cell => cell.alive = true);
}
