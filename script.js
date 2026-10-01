// ดึงโมดูล Matter.js
const { Engine, Render, Runner, Bodies, Composite, Events } = Matter;

let engine, render, runner;
let ground, leftWall, rightWall;
let isGameOver = false;
let score = 0;
let comboCount = 0;
let riseIntervalTimer = null;
let gameOverTimer = null;

const width = 450;
const height = 650;
let groundY = height + 15;

function init() {
    // สร้าง Engine
    engine = Engine.create();

    // สร้าง Render
    render = Render.create({
        element: document.getElementById("game-container"),
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false,
            background: "#f1f2f6"
        }
    });

    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);

    // สร้างกำแพงและพื้น
    const wallOptions = { isStatic: true, render: { fillStyle: "#8d6e63" } };
    ground = Bodies.rectangle(width / 2, groundY, width * 2, 60, wallOptions);
    leftWall = Bodies.rectangle(-15, height / 2, 40, height * 2, wallOptions);
    rightWall = Bodies.rectangle(width + 15, height / 2, 40, height * 2, wallOptions);

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // เริ่มระบบ
    startRiseTimer();
    spawnFruit();
}

function startRiseTimer() {
    // กำหนดลูปหรือเงื่อนไขการดันพื้น/สร้างผลไม้
}

function spawnFruit() {
    if (isGameOver) return;
    // โค้ดสร้างผลไม้ลูกใหม่
}

function triggerGameOver(titleText) {
    if (isGameOver) return;
    isGameOver = true;

    clearInterval(riseIntervalTimer);
    if (gameOverTimer) clearTimeout(gameOverTimer);

    playGameOverSound();

    document.getElementById("end-title").innerText = titleText;
    document.getElementById("final-score").innerText = score;
    document.getElementById("end-screen").style.display = "flex";
}

function triggerVictory() {
    if (isGameOver) return;
    isGameOver = true;

    clearInterval(riseIntervalTimer);
    if (gameOverTimer) clearTimeout(gameOverTimer);

    playVictorySound();

    document.getElementById("end-title").innerText = "YOU WIN! 🍉";
    document.getElementById("end-title").style.color = "#4caf50";
    document.getElementById("final-score").innerText = score;
    document.getElementById("end-screen").style.display = "flex";
}

function restartGame() {
    isGameOver = false;
    score = 0;
    comboCount = 0;
    if (gameOverTimer) clearTimeout(gameOverTimer);
    gameOverTimer = null;

    document.getElementById("score").innerText = "0";
    document.getElementById("end-screen").style.display = "none";
    document.getElementById("warning-overlay").style.display = "none";
    document.getElementById("end-title").style.color = "#ffffff";

    Composite.clear(engine.world, false);

    groundY = height + 15;
    const wallOptions = { isStatic: true, render: { fillStyle: "#8d6e63" } };
    ground = Bodies.rectangle(width / 2, groundY, width * 2, 60, wallOptions);
    const leftWall = Bodies.rectangle(-15, height / 2, 40, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 15, height / 2, 40, height * 2, wallOptions);

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    startRiseTimer();
    spawnFruit();
}

function playGameOverSound() {
    // เพิ่มเสียงจบเกมที่นี่
}

function playVictorySound() {
    // เพิ่มเสียงชนะเกมที่นี่
}

window.onload = init;
