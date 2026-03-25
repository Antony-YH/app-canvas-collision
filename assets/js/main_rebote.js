// main_rebote.js
(() => {
    const canvas = document.getElementById("canvas-rebote");
    const ctx = canvas.getContext("2d");
    const width = 400, height = 400;
    canvas.width = width; canvas.height = height;

    class Circle {
        constructor(x, y, radius, color, text, speed) {
            this.posX = x; this.posY = y; this.radius = radius;
            this.baseColor = color; 
            this.color = color;
            this.text = text; this.speed = speed;
            this.dx = (Math.random() - 0.5) * speed * 4;
            this.dy = (Math.random() - 0.5) * speed * 4;
            this.isColliding = false;
        }
        draw(context) {
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
            context.fill(); 
            
            context.strokeStyle = "rgba(255, 255, 255, 0.8)"; 
            context.lineWidth = 2;
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
            // Cambia a AMARILLO al rebotar, de lo contrario es naranja
            this.color = this.isColliding ? "#ffcc00" : this.baseColor; 
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
            // Círculos NARANJAS (translúcidos para un mejor efecto)
            circles.push(new Circle(x, y, radius, "rgba(255, 46, 203, 0.64)", i + 1, speed)); 
        }
    }
    function detectCollisions() {
        for (let i = 0; i < circles.length; i++) circles[i].isColliding = false;
        for (let i = 0; i < circles.length; i++) {
            for (let j = i + 1; j < circles.length; j++) {
                let dx = circles[j].posX - circles[i].posX;
                let dy = circles[j].posY - circles[i].posY;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < circles[i].radius + circles[j].radius) {
                    circles[i].isColliding = true; circles[j].isColliding = true;
                    
                    let angle = Math.atan2(dy, dx);
                    let sin = Math.sin(angle), cos = Math.cos(angle);

                    let v1 = { x: circles[i].dx * cos + circles[i].dy * sin, y: circles[i].dy * cos - circles[i].dx * sin };
                    let v2 = { x: circles[j].dx * cos + circles[j].dy * sin, y: circles[j].dy * cos - circles[j].dx * sin };

                    let temp = v1.x; v1.x = v2.x; v2.x = temp;

                    circles[i].dx = v1.x * cos - v1.y * sin;
                    circles[i].dy = v1.y * cos + v1.x * sin;
                    circles[j].dx = v2.x * cos - v2.y * sin;
                    circles[j].dy = v2.y * cos + v2.x * sin;

                    let overlap = (circles[i].radius + circles[j].radius) - distance;
                    let sepX = overlap * cos / 2, sepY = overlap * sin / 2;
                    circles[i].posX -= sepX; circles[i].posY -= sepY;
                    circles[j].posX += sepX; circles[j].posY += sepY;
                }
            }
        }
    }
    function update() {
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, width, height);
        detectCollisions();
        for (let i = 0; i < circles.length; i++) circles[i].update(ctx);
    }

    document.getElementById("circleSlider").addEventListener("input", (e) => init(e.target.value));
    init(10); update();
})();