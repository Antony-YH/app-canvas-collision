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
        this.baseColor = color;
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = (Math.random() - 0.5) * speed * 4;
        this.dy = (Math.random() - 0.5) * speed * 4;

        this.isColliding = false;
    }

    draw(context) {
        context.beginPath();

        // 🔥 Relleno (cambia en colisión)
        context.fillStyle = this.color;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        context.fill();

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();

        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "16px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    update(context) {
        // Rebote con paredes
        if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY + this.radius) > window_height || (this.posY - this.radius) < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;

        // 🔥 Color según colisión
        this.color = this.isColliding ? "orange" : this.baseColor;

        this.draw(context);
    }
}

// ==============================
// 🔥 CREAR N CÍRCULOS
// ==============================

let circles = [];
const N = 10;

for (let i = 0; i < N; i++) {
    let radius = Math.floor(Math.random() * 30 + 20);

    let x = Math.random() * (window_width - radius * 2) + radius;
    let y = Math.random() * (window_height - radius * 2) + radius;

    let speed = Math.random() * 3 + 1;

    circles.push(new Circle(x, y, radius, "blue", i + 1, speed));
}

// ==============================
// 🔥 DETECCIÓN + REBOTE
// ==============================

function detectCollisions() {
    // Reset
    for (let i = 0; i < circles.length; i++) {
        circles[i].isColliding = false;
    }

    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {

            let dx = circles[j].posX - circles[i].posX;
            let dy = circles[j].posY - circles[i].posY;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < circles[i].radius + circles[j].radius) {

                // 🔥 Marcar colisión
                circles[i].isColliding = true;
                circles[j].isColliding = true;

                // ============================
                // 🔥 REBOTE FÍSICO SIMPLE
                // ============================

                // Normalizar vector
                let angle = Math.atan2(dy, dx);

                let sin = Math.sin(angle);
                let cos = Math.cos(angle);

                // Rotar velocidades
                let v1 = {
                    x: circles[i].dx * cos + circles[i].dy * sin,
                    y: circles[i].dy * cos - circles[i].dx * sin
                };

                let v2 = {
                    x: circles[j].dx * cos + circles[j].dy * sin,
                    y: circles[j].dy * cos - circles[j].dx * sin
                };

                // Intercambiar velocidades en eje X
                let temp = v1.x;
                v1.x = v2.x;
                v2.x = temp;

                // Regresar a sistema original
                circles[i].dx = v1.x * cos - v1.y * sin;
                circles[i].dy = v1.y * cos + v1.x * sin;

                circles[j].dx = v2.x * cos - v2.y * sin;
                circles[j].dy = v2.y * cos + v2.x * sin;

                // ============================
                // 🔥 EVITAR QUE SE PEGUEN
                // ============================

                let overlap = (circles[i].radius + circles[j].radius) - distance;

                let separationX = overlap * cos / 2;
                let separationY = overlap * sin / 2;

                circles[i].posX -= separationX;
                circles[i].posY -= separationY;

                circles[j].posX += separationX;
                circles[j].posY += separationY;
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