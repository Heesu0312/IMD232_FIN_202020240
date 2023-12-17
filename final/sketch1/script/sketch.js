let balloons = [];
let particles = [];

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  for (let i = 0; i < 10; i++) {
    balloons.push(new Balloon(random(width), height));
  }

  cursor(CROSS);
}

function draw() {
  background('#87CEEB');

  for (let i = balloons.length - 1; i >= 0; i--) {
    balloons[i].update();
    balloons[i].display();

    if (
      balloons[i].y < -50 ||
      (balloons[i].isBurst() && !balloons[i].particles.length)
    ) {
      balloons.splice(i, 1);
      balloons.push(new Balloon(random(width), height));
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
}

function mousePressed() {
  for (let i = balloons.length - 1; i >= 0; i--) {
    let d = dist(mouseX, mouseY, balloons[i].x, balloons[i].y);
    if (d < balloons[i].radiusX && d < balloons[i].radiusY) {
      balloons[i].burst();
      balloons.splice(i, 1);
      balloons.push(new Balloon(random(width), height));
    }
  }
}

class Balloon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radiusX = 20;
    this.radiusY = 30;
    this.speed = random(1, 3);
    this.color = this.getRandomColor();
    this.bursting = false;
    this.particles = [];
  }

  getRandomColor() {
    const colors = [
      color(255, 0, 0),
      color(255, 165, 0),
      color(255, 255, 0),
      color(0, 128, 0),
      color('blue'),
    ];
    return random(colors).levels;
  }

  update() {
    if (!this.bursting) {
      this.y -= this.speed;
    } else {
      for (let particle of this.particles) {
        particle.update();
      }
    }
  }

  display() {
    if (!this.bursting) {
      fill(this.color);
      noStroke();
      ellipse(this.x, this.y, this.radiusX * 2, this.radiusY * 2); // 타원 모양으로 변경

      stroke(255);
      strokeWeight(1);
      line(this.x, this.y + this.radiusY, this.x, this.y + this.radiusY * 2);

      fill(this.color);
      noStroke();
      triangle(
        this.x - this.radiusX + 12,
        this.y + this.radiusY * 1,
        this.x + this.radiusX - 12,
        this.y + this.radiusY * 1,
        this.x,
        this.y + this.radiusY * 1 - this.radiusY
      );

      stroke(255);
      strokeWeight(1);
      line(
        this.x,
        this.y + this.radiusY * 2,
        this.x,
        this.y + this.radiusY * 3
      );
    } else {
      for (let particle of this.particles) {
        particle.display();
      }
    }
  }

  burst() {
    this.bursting = true;
    for (let i = 0; i < 30; i++) {
      particles.push(new Particle(this.x, this.y, this.color));
    }
  }

  isBurst() {
    return this.bursting;
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = random(2, 5);
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
    this.alpha = 255;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.alpha -= 5;
  }

  display() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], this.alpha);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  isFinished() {
    return this.alpha <= 0;
  }
}
