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

let scoretext = document.getElementById("score");
let bestscoretext = document.getElementById("best-score");

let score = 0;
let bestscore = 0;

function draw() {
    if(state){
        context.drawImage(back, 0, 0);
        context.drawImage(bird, xPos, yPos);

        if (yPos + bird.height >= canvas.height - road.height) {
            reload();
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
                xPos <= pipe[i].x + pipeUp.width &&
                (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
                reload();
            }
            if (pipe[i].x == 0) {
                score++;
                 score_audio.play();
            }
        }

        context.drawImage(road, 0, 400);

        scoretext.innerHTML = "SCORE: " + score;
        bestscoretext.innerHTML = "BEST SCORE: " + bestscore;
    }
}

document.addEventListener("mousedown", moveUp) ||
document.addEventListener("keydown", function (event) {
    if (event.code == "Space") {
        moveUp();
    }
})

function moveUp() {
    if (yPos > 0) {
        velY = -4;
        fly_audio.play();
    }
}

function reload() {
    if (score > bestscore) {
        bestscore = score;
    }
    xPos = 20;
    yPos = 150;
    velY = 0;
    pipe = [];
    score = 0;
    pipe[0] = {
        x: canvas.width,
        y: 0,
    };
}

var state = true;
function pause() {
    state = !state;
}

setInterval(draw, 20);