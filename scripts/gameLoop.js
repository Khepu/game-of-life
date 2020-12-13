import R from 'ramda';

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
    ellipse(50, 50, 80, 80);
}

const state = (width, height) => {
    const flatState = R.repeat(false, width * height);
    return R.map(chunkId => R.take(width, R.drop(chunkId * width, flatState)),
                 R.range(height));
};
