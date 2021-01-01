const state = (width, height) =>
      R.map(wh => cell((wh % width),
                 (wh / width) | 0),
            R.range(0, width * height));

const isAdjacent = (cell1, cell2) =>
      cell1 !== cell2
      && (Math.abs(cell1.pos[0] - cell2.pos[0]) === 1 && cell1.pos[1] === cell2.pos[1])
      || (Math.abs(cell1.pos[1] - cell2.pos[1]) === 1 && cell1.pos[0] === cell2.pos[0]);

const neighbors = (state, cell) => {
    const isAdjacentTo = R.curry(isAdjacent)(cell);
    return R.filter(isAdjacentTo, R.flatten(state));
};

const aliveNeighbors = (state, cell) =>
    R.filter(c => c.alive, neighbors(state, cell));


const rule1 = (state, cell) => {
    //Any live cell with fewer than two live neighbours dies, as if by underpopulation.

    if (!cell.alive) {
        return pass(cell);
    }

    return aliveNeighbors(state, cell).length < 2
        ? kill(cell)
        : pass(cell);
};

const rule2 = (state, cell) => {
    //Any live cell with two or three live neighbours lives on to the next generation.

    if (!cell.alive) {
        return pass(cell);
    }

    const neighbors = aliveNeighbors(state, cell).length;

    return neighbors === 2 || neighbors === 3
        ? pass(cell)
        : pass(cell);
};

const rule3 = (state, cell) => {
    //Any live cell with more than three live neighbours dies, as if by overpopulation.

    if (!cell.alive) {
        return pass(cell);
    }

    return aliveNeighbors(state, cell).length == 4
        ? kill(cell)
        : pass(cell);
};

const rule4 = (state, cell) => {
    //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction

    if(cell.alive) {
        return pass(cell);
    }

    return aliveNeighbors(state, cell).length === 3
        ? revive(cell)
        : pass(cell);
};

const update = (state, cell) => {
    state[cell.pos[0] * GRID_WIDTH + cell.pos[1]] = cell;
    return state;
};

const applyRule = (flatState, rule) =>
      R.map(cell => rule(flatState, cell), flatState);

const evolve = (state) =>
      R.map(evolveCell,
            R.reduce((partialState, rule) => applyRule(partialState, rule),
                     state,
                     [rule1, rule2, rule3, rule4]));

