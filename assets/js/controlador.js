const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.6;

let animationId;
let circles = [];

let currentMode = "move";
let N = 10;

const slider = document.getElementById("circleSlider");
const label = document.getElementById("circleCount");
const selector = document.getElementById("modeSelector");

// ============================
// 🔥 CARGAR SCRIPT DINÁMICO
// ============================

function loadMode() {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentMode === "move") {
        startMove(N);
    } else if (currentMode === "collision") {
        startCollision(N);
    } else if (currentMode === "bounce") {
        startBounce(N);
    }
}

// ============================
// 🎚️ EVENTOS
// ============================

slider.addEventListener("input", () => {
    N = slider.value;
    label.textContent = N;
    loadMode(); // 🔥 refresca animación
});

selector.addEventListener("change", () => {
    currentMode = selector.value;
    loadMode();
});

// Inicial
loadMode();