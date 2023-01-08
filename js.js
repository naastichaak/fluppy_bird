let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
canvas.width = 256;
canvas.height = 512;

let bird = new Image();
let back = new Image();
let road = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "./img/bird.png";
back.src = "./img/back.png";
road.src = "./img/road.png";
pipeUp.src = "./img/pipeUp.png";
pipeBottom.src = "./img/pipeBottom.png";

let fly_audio = new Audio();
let score_audio = new Audio();

fly_audio.src = "./audio/fly.mp3";
score_audio.src = "./audio/score.mp3";

let xPos = 20;
let yPos = 150;

let gravity = 0.2;
let velY = 0;

let gap = 100;

let pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0,
};

function draw() {
    context.drawImage(back, 0, 0);
    context.drawImage(bird, xPos, yPos);

    if (yPos + bird.height >= canvas.height - road.height) {
        location.reload();
    }

    velY += gravity;
    yPos += velY;

    for (let i = 0; i < pipe.length; i++) {
        if (pipe[i].x < -pipeUp.width) {
            pipe.shift();
        } else {
            context.drawImage(pipeUp, pipe[i].x, pipe[i].y);
            context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

            pipe[i].x -= 2;

            if (pipe[i].x == 90) {
                pipe.push({
                    x: canvas.width,
                    y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
                });
            }
        }

        if (
            xPos + bird.width >= pipe[i].x &&
            yPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
            yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
            location.reload();
        }
    }

    context.drawImage(road, 0, 400);
}

canvas.addEventListener("mousedown", moveUp);

function moveUp() {
    if (yPos > 0) {
        velY = -4;
        fly_audio.play();
    }
}

setInterval(draw, 20);