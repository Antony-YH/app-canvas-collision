// main.js
(() => {
    const canvas = document.getElementById("canvas-movimiento");
    const ctx = canvas.getContext("2d");
    const width = 400, height = 400;
    canvas.width = width; canvas.height = height;

    class Circle {
        constructor(x, y, radius, color, text, speed) {
            this.posX = x; this.posY = y; this.radius = radius;
            this.color = color; 
            this.text = text; this.speed = speed;
            this.dx = (Math.random() - 0.5) * this.speed * 4;
            this.dy = (Math.random() - 0.5) * this.speed * 4;
        }
        draw(context) {
            context.beginPath();
            context.strokeStyle = this.color;
            context.lineWidth = 3;
            context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
            context.stroke();
            context.fillStyle = "white"; 
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = "bold 16px Arial";
            context.fillText(this.text, this.posX, this.posY);
            context.closePath();
        }
        update(context) {
            if ((this.posX + this.radius) > width || (this.posX - this.radius) < 0) this.dx = -this.dx;
            if ((this.posY + this.radius) > height || (this.posY - this.radius) < 0) this.dy = -this.dy;
            this.posX += this.dx; this.posY += this.dy;
            this.draw(context);
        }
    }

    let circles = [];
    function init(N) {
        circles = [];
        for (let i = 0; i < N; i++) {
            let radius = Math.floor(Math.random() * 20 + 15);
            let x = Math.random() * (width - radius * 2) + radius;
            let y = Math.random() * (height - radius * 2) + radius;
            let speed = Math.random() * 2 + 1;
            // Círculos VERDES
            circles.push(new Circle(x, y, radius, "#00ff88", i + 1, speed));
        }
    }
    function updateCircle() {
        requestAnimationFrame(updateCircle);
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < circles.length; i++) circles[i].update(ctx);
    }

    document.getElementById("circleSlider").addEventListener("input", (e) => init(e.target.value));
    init(10); updateCircle();
})();