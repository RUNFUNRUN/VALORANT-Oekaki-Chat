let l = 50;
let hCount = 27;
let vCount = 13;
let frame = 2;

function setup() {
    let canvasWeight = l * hCount + frame * 2;
    let canvasHeight = l * vCount + frame * 2;
    createCanvas(canvasWeight, canvasHeight);
}

function draw() {
    background(100);
    fill(255);
    stroke(frame);
    for(let i = 0; i < hCount; i++) {
        for(let j = 0; j < vCount; j++) {
            let x = i * l + frame;
            let y = j * l + frame;
            rect(x, y, l, l);
        }
    }
}