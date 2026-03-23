const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Dimensiones
const window_height = window.innerHeight / 2;
const window_width = window.innerWidth / 2;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.baseColor = color; // color original
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = (Math.random() - 0.5) * this.speed * 2;
        this.dy = (Math.random() - 0.5) * this.speed * 2;

        this.isColliding = false;
    }

    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        context.stroke();

        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    update(context) {
        // Rebote contra bordes
        if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY + this.radius) > window_height || (this.posY - this.radius) < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;

        // Color según colisión
        this.color = this.isColliding ? "red" : this.baseColor;

        this.draw(context);
    }
}

// ==============================
// 🔥 CREAR N CÍRCULOS
// ==============================

let circles = [];
const N = 10; // 🔥 cambia aquí la cantidad de círculos

for (let i = 0; i < N; i++) {
    let radius = Math.floor(Math.random() * 40 + 20);

    let x = Math.random() * (window_width - radius * 2) + radius;
    let y = Math.random() * (window_height - radius * 2) + radius;

    let speed = Math.random() * 3 + 1;

    circles.push(new Circle(x, y, radius, "blue", i + 1, speed));
}

// ==============================
// 🔥 DETECCIÓN DE COLISIONES
// ==============================

function detectCollisions() {
    // Resetear estado
    for (let i = 0; i < circles.length; i++) {
        circles[i].isColliding = false;
    }

    // Comparar todos contra todos
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            let dx = circles[i].posX - circles[j].posX;
            let dy = circles[i].posY - circles[j].posY;

            let distance = Math.sqrt(dx * dx + dy * dy);

            // Colisión si se tocan o se enciman
            if (distance <= circles[i].radius + circles[j].radius) {
                circles[i].isColliding = true;
                circles[j].isColliding = true;
            }
        }
    }
}

// ==============================
// 🔄 ANIMACIÓN
// ==============================

function update() {
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, window_width, window_height);

    detectCollisions();

    for (let i = 0; i < circles.length; i++) {
        circles[i].update(ctx);
    }
}

update();