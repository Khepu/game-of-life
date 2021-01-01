const randomValue = () => (Math.random() * 254 + 1) | 0;

const randomColor = () =>
      [randomValue(),
       randomValue(),
       randomValue()];

const randomChannel = () => (Math.random() * 3) | 0;

const brightenColor = (color) => R.map(c => (c + 1) % 256, color);

const cell = (x, y) => {
    return {
        pos: [x, y],
        alive: !!(((Math.random() * 10) | 0) % 2), //TODO: change to false
        color: randomColor(),
        advances: true,
    };
};

const kill = cellObj => {
    const channel = randomChannel();
    const newColor = R.map((color, index) =>
        index === channel
            ? randomValue()
            : color,
        cellObj.color);

    return {
        ...cellObj,
        color: newColor,
        alive: false,
    };
};

const pass = cellObj => {
    return {
        ...cellObj,
        color: brightenColor(cellObj.color)
    };
};

const revive = cellObj => {
    return {
        ...cellObj,
        color: randomColor(),
        alive: true,
    };
};

const cellColor = (cellObj) =>
      cellObj.alive ? cellObj.color : [0, 0, 0];

const evolveCell = (cellObj) => {
    return cellObj;
    return {
        ...cellObj,
        alive: cellObj.advances,
        advances: false
    };
};